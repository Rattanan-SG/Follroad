<template>
  <div>
    <v-btn
      round
      color="success"
      class="white--text"
      @click.stop="openDialog"
      :disabled="loading"
      :loading="loading"
      depressed
    >
      บันทึกเส้นทาง
      <v-icon class="ml-2">save</v-icon>
    </v-btn>
    <v-layout row justify-center v-if="startLocation">
      <v-dialog v-model="dialog" persistent max-width="600px" scrollable>
        <v-card>
          <v-toolbar color="blue" dark flat>
            <v-icon>save</v-icon>
            <v-toolbar-title>บันทึกเส้นทาง</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-layout wrap>
                <v-flex xs12 sm6 px-1>
                  <v-text-field
                    v-model="start"
                    label="ชื่อจุดเริ่มต้น"
                    prepend-inner-icon="place"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 px-1>
                  <v-text-field
                    v-model="destination"
                    label="ชื่อจุดหมาย"
                    prepend-inner-icon="place"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 px-1>
                  <v-text-field
                    label="กรอกชื่อเส้นทางที่บันทึก *"
                    v-model="name"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 px-1>
                  <div class="subheading black--text px-3">เลือกเส้นทางที่ต้องการรับแจ้งเตือน</div>
                  <v-checkbox
                    v-for="(route, index) in directionsResponse.routes"
                    v-model="notificationRoutes"
                    :key="index"
                    :value="index"
                    :label="
                      `${route.summary} ระยะทาง ${route.legs[0].distance.text} ประมาณ ${route.legs[0].duration.text}`
                    "
                  ></v-checkbox>
                </v-flex>

                <v-flex xs12>
                  <v-list two-line>
                    <v-subheader class="subheading black--text">การตั้งเวลาตรวจสอบเส้นทางล่วงหน้า</v-subheader>
                    <v-list-tile
                      avatar
                      class="my-tile"
                      v-for="(item, index) in notificationTime"
                      :key="index"
                    >
                      <v-list-tile-avatar tile>
                        <v-icon>timer</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title
                          class="title"
                        >{{item.time | luxon:locale('time24simple')}}</v-list-tile-title>
                        <v-list-tile-sub-title
                          v-if="item.days && item.days.length > 0"
                        >{{ item.days | daysTH }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title v-else>
                          ณ วันที่
                          {{item.time | luxon:locale('dateShort')}}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-layout wrap row>
                          <v-btn
                            flat
                            icon
                            color="grey"
                            class="mr-2"
                            @click.stop="deleteNotificationTime(index)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                          <v-switch v-model="item.ongoing"></v-switch>
                        </v-layout>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>

                  <div class="text-xs-center">
                    <v-dialog v-model="dialog2" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn block color="indigo" dark v-on="on">เพิ่มการตั้งเวลา</v-btn>
                      </template>
                      <v-card>
                        <v-toolbar color="indigo" dark flat>
                          <v-icon>timer</v-icon>
                          <v-toolbar-title>เพิ่มการตั้งเวลา</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form2" v-model="valid2">
                            <v-layout wrap row>
                              <v-radio-group v-model="notifiactionTimeType" row class="px-1">
                                <v-radio label="เจาะจงวันที่" value="onetime"></v-radio>
                                <v-radio label="รายสัปดาห์" value="schedule"></v-radio>
                              </v-radio-group>
                              <template v-if="notifiactionTimeType === 'onetime'">
                                <v-flex xs12 px-1>
                                  <v-menu
                                    v-model="onetimeDatePicker"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        v-model="onetimeDate"
                                        label="เลือกวันที่"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                        clearable
                                        :rules="[rules.required]"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="onetimeDate"
                                      @input="onetimeDatePicker = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-flex>
                                <v-flex xs12 px-1>
                                  <v-menu
                                    ref="onetimeTimePicker"
                                    v-model="onetimeTimePicker"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="time"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        v-model="time"
                                        label="ตั้งเวลา"
                                        prepend-icon="access_time"
                                        readonly
                                        v-on="on"
                                        clearable
                                        :rules="[
                                            rules.required,
                                            rules.minTime
                                          ]"
                                      ></v-text-field>
                                    </template>
                                    <v-time-picker
                                      v-if="onetimeTimePicker"
                                      v-model="time"
                                      full-width
                                      format="24hr"
                                      @click:minute="
                                          $refs.onetimeTimePicker.save(time)
                                        "
                                    ></v-time-picker>
                                  </v-menu>
                                </v-flex>
                              </template>
                              <template v-if="notifiactionTimeType === 'schedule'">
                                <v-flex xs12 px-1>
                                  <v-combobox
                                    v-model="scheduleDays"
                                    :items="days"
                                    :return-object="false"
                                    label="เลือกวัน (วันจันทร์-วันอาทิตย์)"
                                    prepend-icon="date_range"
                                    multiple
                                    chips
                                    :rules="[rules.listAtLeastOne]"
                                  ></v-combobox>
                                </v-flex>
                                <v-flex xs12 px-1>
                                  <v-menu
                                    ref="scheduleTimePicker"
                                    v-model="scheduleTimePicker"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="time"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        v-model="time"
                                        label="ตั้งเวลา"
                                        prepend-icon="access_time"
                                        readonly
                                        v-on="on"
                                        clearable
                                        :rules="[rules.required]"
                                      ></v-text-field>
                                    </template>
                                    <v-time-picker
                                      v-if="scheduleTimePicker"
                                      v-model="time"
                                      full-width
                                      format="24hr"
                                      @click:minute="
                                          $refs.scheduleTimePicker.save(time)
                                        "
                                    ></v-time-picker>
                                  </v-menu>
                                </v-flex>
                                <v-flex xs12 px-1 pt-2>
                                  <div>
                                    * ถ้าบันทึกเวลาน้อยกว่า 5
                                    นาทีจากเวลาปัจจุบัน
                                    จะไม่ได้รับการแจ้งเตือนครั้งแรก
                                  </div>
                                </v-flex>
                              </template>
                            </v-layout>
                          </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="red darken-1" flat @click="dialog2 = false">ยกเลิก</v-btn>
                          <v-btn
                            color="blue darken-1"
                            flat
                            :loading="loading"
                            @click="submitNewNotificationTime"
                          >เพิ่ม</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-flex>
              </v-layout>
            </v-form>
            <v-alert
              :value="success"
              color="success"
              icon="check_circle"
              outline
            >บันทึกเส้นทางสำเร็จ</v-alert>
            <v-alert :value="error" color="error" icon="warning" outline>บันทึกเส้นทางไม่สำเร็จ</v-alert>
            <div
              class="subheading red--text --text-accent-4 text-xs-center pt-2"
            >* ตรวจสอบการรับแจ้งเตือนว่าเปิดหรือปิดอยู่ได้ที่หน้าโปรไฟล์ *</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="dialog = false">ยกเลิก</v-btn>
            <v-btn color="blue darken-1" flat :loading="loading" @click="submit">บันทึก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import directionRecordApi from "@/api/direction-record";
export default {
  name: "SearchSaveRouteDialog",
  props: {
    historyMode: Object,
    startLocation: Object,
    destinationLocation: Object,
    directionsResponse: Object
  },
  data() {
    return {
      dialog: false,
      dialog2: false,
      valid: false,
      valid2: false,
      onetimeDatePicker: false,
      onetimeTimePicker: false,
      scheduleTimePicker: false,
      loading: false,
      success: false,
      error: false,
      id: null,
      start: this.startLocation && this.startLocation.name,
      destination: this.destinationLocation && this.destinationLocation.name,
      name: null,
      notificationRoutes: [],
      notificationTime: [],
      notifiactionTimeType: "onetime",
      onetimeDate: new Date().toISOString().substr(0, 10),
      scheduleDays: [],
      time: null,
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล",
        listAtLeastOne: value =>
          value.length > 0 || "กรุณาเลือกอย่างน้อย 1 ตัวเลือก",
        minTime: value => this.timeMustMoreThanNowFiveMinutes(value)
      },
      days: [
        { value: "Monday", text: "วันจันทร์" },
        { value: "Tuesday", text: "วันอังคาร" },
        { value: "Wednesday", text: "วันพุธ" },
        { value: "Thursday", text: "วันพฤหัสบดี" },
        { value: "Friday", text: "วันศุกร์" },
        { value: "Saturday", text: "วันเสาร์" },
        { value: "Sunday", text: "วันอาทิตย์" }
      ]
    };
  },
  computed: {
    ...mapGetters("direction", ["directionsRenderer"]),
    ...mapGetters("directionRecord", ["directionRecordById"])
  },
  created() {
    if (this.historyMode) {
      this.id = this.historyMode.recordId;
      const record = this.directionRecordById(this.id);
      this.name = record.name;
      this.notificationRoutes = record.notificationRoutes
        ? record.notificationRoutes
        : [];
      this.notificationTime = record.notificationTime
        ? record.notificationTime
        : [];
    }
  },
  methods: {
    ...mapActions("globalFeedback", ["setLoginDialog"]),
    ...mapActions("directionRecord", ["updateDirectionRecordById"]),
    openDialog: function() {
      if (!this.$auth.isAuthenticated) {
        this.setLoginDialog(true);
      } else {
        this.dialog = true;
      }
    },
    deleteNotificationTime: function(index) {
      this.notificationTime.splice(index, 1);
    },
    submitNewNotificationTime: function() {
      if (this.$refs.form2.validate()) {
        this.loading = true;
        let time = null;
        let days = [];
        if (this.notifiactionTimeType === "onetime") {
          time = this.getDateFromDateAndTimeString(this.onetimeDate, this.time);
        } else if (this.notifiactionTimeType === "schedule") {
          time = this.getDateFromDateAndTimeString(
            this.scheduleDays,
            this.time
          );
          days = this.scheduleDays;
        }
        this.notificationTime.push({
          time,
          days,
          type: this.notifiactionTimeType,
          ongoing: true
        });
        this.loading = false;
        this.dialog2 = false;
        this.onetimeDate = new Date().toISOString().substr(0, 10);
        this.scheduleDays = [];
        this.time = null;
      }
    },
    submit: async function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.success = false;
        this.error = false;
        const data = this.getDirectionRecordData();
        try {
          if (!this.id) {
            const { _id } = await directionRecordApi.postRecord(data);
            this.id = _id;
          } else {
            await this.updateDirectionRecordById({
              _id: this.id,
              data
            });
          }
          this.success = true;
        } catch (error) {
          this.error = true;
        } finally {
          this.loading = false;
        }
      }
    },
    getDirectionRecordData: function() {
      const start = {
        name: this.start,
        location: this.startLocation.location
      };
      const destination = {
        name: this.destination,
        location: this.destinationLocation.location
      };
      return {
        uid: this.$auth.user.sub,
        name: this.name,
        start,
        destination,
        direction: this.directionsResponse,
        notificationRoutes: this.notificationRoutes,
        notificationTime: this.notificationTime
      };
    },
    getDateFromDateAndTimeString: function(dateString, timeString) {
      const date =
        typeof dateString === "string" ? new Date(dateString) : new Date();
      if (typeof timeString === "string") {
        const hours = timeString.match(/^(\d+)/)[1];
        const minutes = timeString.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      }
      return date.toISOString();
    },
    timeMustMoreThanNowFiveMinutes: function(value) {
      let now = new Date();
      const date =
        typeof this.onetimeDate === "string"
          ? new Date(this.onetimeDate).getDate()
          : new Date().getDate();
      if (date > now.getDate()) {
        return true;
      } else if (typeof value === "string") {
        const hours = Number(value.match(/^(\d+)/)[1]);
        const minutes = Number(value.match(/:(\d+)/)[1]);
        const nowHours = now.getHours();
        const nowMinutes = now.getMinutes();
        return (
          !value ||
          hours > nowHours ||
          (hours === nowHours && minutes - nowMinutes >= 5) ||
          "้ตั้งเวลาให้มากกว่าเวลาปัจจุบันอย่างน้อย 5 นาที"
        );
      } else {
        return "กรุณากรอกข้อมูล";
      }
    }
  },
  filters: {
    daysTH: function(value) {
      if (!value) return "";
      if (value.length === 7) return "ทุกวัน จันทร์ - อาทิตย์";
      let days = [
        { value: "Monday", text: "จันทร์" },
        { value: "Tuesday", text: "อังคาร" },
        { value: "Wednesday", text: "พุธ" },
        { value: "Thursday", text: "พฤหัสบดี" },
        { value: "Friday", text: "ศุกร์" },
        { value: "Saturday", text: "เสาร์" },
        { value: "Sunday", text: "อาทิตย์" }
      ];
      const result = value
        .map(item => days.find(day => day.value === item).text)
        .join(" ");
      return "วัน " + result;
    }
  }
};
</script>
<style scoped>
::v-deep .my-tile .v-list__tile {
  padding-left: 3px;
  padding-right: 0px;
}
</style>

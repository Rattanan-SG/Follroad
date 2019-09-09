<template>
  <div>
    <v-btn
      color="secondary"
      class="white--text"
      @click.stop="openDialog"
      :disabled="loading"
      :loading="loading"
    >
      บันทึกเส้นทาง
      <v-icon>save</v-icon>
    </v-btn>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px" scrollable>
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-toolbar color="blue" dark flat>
              <v-icon>save</v-icon>
              <v-toolbar-title>บันทึกเส้นทาง</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 sm6 pr-1>
                  <v-text-field
                    v-model="start"
                    label="ชื่อจุดเริ่มต้น"
                    prepend-inner-icon="place"
                    :rules="[rules.required]"
                    :disabled="historyMode"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 pl-1>
                  <v-text-field
                    v-model="destination"
                    label="ชื่อจุดหมาย"
                    prepend-inner-icon="place"
                    :rules="[rules.required]"
                    :disabled="historyMode"
                    clearable
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="กรอกชื่อเส้นทางที่บันทึก *"
                    v-model="name"
                    :rules="[rules.required]"
                    :disabled="historyMode"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <div class="subheading">เลือกเส้นทางที่ต้องการรับแจ้งเตือน *</div>
                  <v-checkbox
                    v-for="(route, index) in directionsResponse.routes"
                    v-model="notificationRoutes"
                    :key="index"
                    :value="index"
                    :label="`${route.summary} ระยะทาง ${route.legs[0].distance.text} ประมาณ ${route.legs[0].duration.text}`"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs12 md12>
                  <v-switch v-model="switch1" label="รับการแจ้งเตือนในเส้นทางนี้ ?"></v-switch>
                </v-flex>

                <v-flex xs12 md12 lg12>
                  <v-card>
                    <v-layout row>
                      <v-flex xs5 md5 lg5 ml-1>
                        <v-combobox
                          v-model="select"
                          :items="items"
                          label="เลือกวัน(จ-อา)"
                          multiple
                          chips
                          v-if="switch1"
                        ></v-combobox>
                      </v-flex>
                      <v-flex xs1 md1 lg1></v-flex>
                      <v-flex xs5 sm5 lg5>
                        <v-menu
                          ref="menu"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                          v-if="switch1"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="time"
                              label="ตั้งเวลา"
                              prepend-icon="access_time"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu2"
                            v-model="time"
                            full-width
                            @click:minute="$refs.menu.save(time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <!-- <v-flex xs1 lg1 md1></v-flex> -->
                      <v-flex lg1 md1 mt-3 v-if="switch1">
                        <v-btn icon small>
                          <v-icon>add_circle_outline</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs5 md5 lg5 v-if="switch1">
                        <v-menu
                          v-model="menuDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field v-model="date" label="เลือกวัน" readonly v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" @input="menuDate = false"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs1 md1 lg1></v-flex>
                      <v-flex xs5 md5 lg5>
                        <v-menu
                          ref="menuSecond"
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time2"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                          v-if="switch1"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="time2"
                              label="ตั้งเวลา"
                              prepend-icon="access_time"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu"
                            v-model="time2"
                            full-width
                            @click:minute="$refs.menuSecond.save(time2)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex lg1 md1 mt-3 v-if="switch1">
                        <v-btn icon small>
                          <v-icon>add_circle_outline</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-spacer></v-spacer>
              </v-layout>
              <v-alert
                :value="success"
                color="success"
                icon="check_circle"
                outline
              >บันทึกเส้นทางสำเร็จ</v-alert>
              <v-alert :value="error" color="error" icon="warning" outline>บันทึกเส้นทางไม่สำเร็จ</v-alert>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn
                color="blue darken-1"
                flat
                :disabled="loading"
                :loading="loading"
                @click="submit"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import directionRecord from "@/api/direction-record";
export default {
  name: "SearchSaveRouteButton",
  props: {
    historyMode: Boolean,
    startLocation: Object,
    destinationLocation: Object,
    directionsResponse: Object
  },
  data() {
    return {
      dialog: false,
      valid: false,
      start: this.startLocation.name,
      destination: this.destinationLocation.name,
      name: null,
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล",
        listAtLeastOne: value =>
          value.length > 0 || "กรุณาเลือกอย่างน้อย 1 ตัวเลือก"
      },
      notificationRoutes: [],
      loading: false,
      success: false,
      error: false,
      recordId: null,
      time: null,
      time2: null,
      menu: false,
      menu2: false,
      menuDate: false,
      modal2: false,
      switch1: false,
      date: new Date().toISOString().substr(0, 10),
      select: null,
      items: [
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัสบดี",
        "ศุกร์",
        "เสาร์"
      ]
    };
  },
  computed: {
    ...mapGetters("direction", ["directionsRenderer"])
  },
  methods: {
    ...mapActions("globalDialog", ["setLoginDialog"]),
    openDialog: function() {
      if (!this.$auth.isAuthenticated()) {
        this.setLoginDialog(true);
      } else {
        this.dialog = true;
      }
    },
    submit: async function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.success = false;
        this.error = false;
        const data = this.getDirectionRecordData();
        try {
          if (!this.recordId) {
            const { _id } = await directionRecord.postRecords(data);
            this.recordId = _id;
          } else {
            await directionRecord.patchRecordById(this.recordId, data);
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
        uid: this.$auth.profile.sub,
        name: this.name,
        start,
        destination,
        notificationRoutes: this.notificationRoutes,
        direction: this.directionsResponse
      };
    }
  }
};
</script>
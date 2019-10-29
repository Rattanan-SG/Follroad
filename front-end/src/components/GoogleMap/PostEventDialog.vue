<template>
  <div>
    <v-btn
      color="blue white--text"
      outline
      @click.stop="openDialog"
      :disabled="loading"
      :loading="loading"
    >แจ้งเหตุ</v-btn>
    <v-layout row justify-center v-if="marker">
      <v-dialog v-model="dialog" persistent max-width="600px" scrollable>
        <v-form ref="form" v-model="valid" style="width:100%">
          <v-card>
            <v-toolbar color="red darken-3" dark flat>
              <v-icon>report</v-icon>
              <v-toolbar-title>แจ้งเหตุการณ์</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 sm6 pr-1>
                  <v-text-field
                    label="ชื่อเหตุการณ์"
                    prepend-icon="textsms"
                    v-model="title"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 pr-1>
                  <v-select
                    label="ประเภทเหตุการณ์"
                    prepend-icon="category"
                    v-model="eventType"
                    :items="items"
                    item-text="label"
                    item-value="value"
                    :rules="[rules.required]"
                  ></v-select>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 sm6 pr-1>
                  <v-menu
                    ref="startMenu"
                    v-model="startMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startTime"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="230px"
                    min-width="230px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="startTime"
                        label="เวลาที่เกิดเหตุการณ์"
                        prepend-icon="access_time"
                        placeholder="ค่าเริ่มต้นคือเวลาปัจจุบัน"
                        readonly
                        :rules="[rules.notMoreThanNow]"
                        clearable
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="startMenu"
                      v-model="startTime"
                      full-width
                      format="24hr"
                      @click:minute="$refs.startMenu.save(startTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 pr-1>
                  <v-text-field
                    v-model="stopHours"
                    type="number"
                    prepend-icon="timelapse"
                    label="สิ้นสุดในอีกกี่ชั่วโมง"
                    placeholder="ถ้า 0 ระบบจะคำนวนให้"
                    suffix="ชั่วโมง"
                    :rules="[rules.minDuration, rules.maxDuration]"
                    clearable
                  />
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 pr-1>
                  <v-textarea
                    label="รายละเอียดเหตุการณ์"
                    v-model="description"
                    prepend-icon="description"
                    outline
                    rows="3"
                    :rules="[rules.required]"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <!------------userเพิ่มรูป------------->
              <v-flex xs12>
                <PictureUploadAndPreview />
              </v-flex>
              <!------------------------->
              <v-alert :value="error" color="error" icon="warning" outline>แจ้งเหตุการณ์ไม่สำเร็จ</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="cancel">ยกเลิก</v-btn>
              <v-btn
                color="blue darken-1"
                flat
                :disabled="loading"
                :loading="loading"
                @click="submit"
              >แจ้งเหตุ</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";
import PictureUploadAndPreview from "../Feedback/PictureUploadAndPreview";
export default {
  name: "PostEventDialog",
  props: {
    marker: Object,
    closeInfoWindow: Function,
    completePostEvent: Function
  },
  components: {
    PictureUploadAndPreview
  },
  data() {
    return {
      dialog: false,
      valid: false,
      items: eventConstant.EVENT_CATEGORY_OBJECT,
      title: null,
      eventType: null,
      startMenu: false,
      startTime: null,
      stopHours: null,
      description: null,
      image: "",
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล",
        notMoreThanNow: value => {
          const date = this.getDateFromTimeString(value);
          return +date <= +new Date() || "เวลาต้องไม่เกินเวลาปัจจุบัน";
        },
        minDuration: value =>
          !value || value >= 0 || "ระยะเวลาน้อยกว่า 0 ไม่ได้",
        maxDuration: value =>
          !value || value <= 24 || "ระยะเวลาไม่เกิน 24 ชั่วโมง"
      },
      loading: false,
      error: false,
      upload: null
    };
  },
  methods: {
    ...mapActions("globalFeedback", ["setLoginDialog", "openMessageSnackbar"]),

    openDialog: function() {
      if (!this.$auth.isAuthenticated()) {
        this.setLoginDialog(true);
      } else {
        this.dialog = true;
      }
    },
    cancel: function() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    submit: async function() {
      if (!this.$auth.isAuthenticated()) {
        this.setLoginDialog(true);
      } else if (this.$refs.form.validate()) {
        this.loading = true;
        this.error = false;
        const data = this.getEventData();
        try {
          const responseEvent = await eventApi.postEvent(data);
          this.checkEventStatus(responseEvent);
          this.completePostEvent();
          this.closeInfoWindow();
        } catch (error) {
          this.error = true;
        } finally {
          this.$refs.form.reset();
          this.loading = false;
          this.dialog = false;
        }
      }
    },
    getEventData: function() {
      const { name, sub } = this.$auth.profile;
      const { lat: latitude, lng: longitude } = this.marker.position;
      const { value: icon, type } = eventConstant.EVENT_CATEGORY_OBJECT.find(
        element => element.value === this.eventType
      );
      const { start, stop } = this.calculateStartAndStopFromData();
      return {
        title: this.title,
        description: this.description,
        latitude,
        longitude,
        start,
        stop,
        contributor: name,
        uid: sub,
        icon,
        type,
        source: "follroad"
      };
    },
    getDateFromTimeString: function(timeString) {
      const date = new Date();
      if (typeof timeString === "string") {
        const hours = timeString.match(/^(\d+)/)[1];
        const minutes = timeString.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      }
      return date;
    },
    calculateStartAndStopFromData: function() {
      const start = this.getDateFromTimeString(this.startTime);
      let stop = new Date(start);
      if (!Number(this.stopHours)) stop = null;
      else stop.setHours(stop.getHours() + Number(this.stopHours));
      return { start, stop };
    },
    checkEventStatus: function(event) {
      if (new Date() > new Date(event.stop)) {
        this.openMessageSnackbar({
          text: `แจ้งเหตุสำเร็จแต่ ${event.title} นั้นสิ้นสุดเหตุการณ์แล้ว`,
          color: "cyan darken-2"
        });
        return false;
      } else return true;
    }
  }
};
</script>
<style scoped>
.wrapper {
  max-width: 600px;
  max-height: 500px;
  margin: 0 auto;
}
</style>
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
            <v-toolbar color="blue" dark flat>
              <v-icon>post_add</v-icon>
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
                    placeholder="ค่าเริ่มต้นระบบจะคำนวนให้"
                    suffix="ชั่วโมง"
                    :rules="[rules.maxHours]"
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
import event from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";
export default {
  name: "PostEventDialog",
  props: {
    marker: Object,
    closeInfoWindow: Function,
    completePostEvent: Function
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
        maxHours: value => value <= 24 || "ระยะเวลาไม่เกิน 24 ชั่วโมง"
      },
      success: false,
      loading: false,
      error: false
    };
  },
  methods: {
    ...mapActions("globalFeedback", ["setLoginDialog"]),

    openDialog: function() {
      if (!this.$auth.isAuthenticated()) {
        this.setLoginDialog(true);
      } else {
        this.dialog = true;
      }
    },
    // onFileChange(e) {
    //   var files = e.target.files || e.data.Transfer.files;
    //   if (!files.length) return;
    //   this.createImage(files[0]);
    // },
    // createImage(file) {
    //   var image = new Image();
    //   var reader = new FileReader();
    //   var vm = this;
    //   reader.onload = e => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
    // removeImage: function(e) {
    //   this.image = "";
    // }
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
          const responseEvent = await event.postEvent(data);
          this.completePostEvent();
          this.closeInfoWindow();
        } catch (error) {
          this.error = true;
        } finally {
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
    calculateStartAndStopFromData: function() {
      const start = new Date();
      if (typeof this.startTime === "string") {
        const hours = this.startTime.match(/^(\d+)/)[1];
        const minutes = this.startTime.match(/:(\d+)/)[1];
        start.setHours(hours);
        start.setMinutes(minutes);
      }
      let stop = new Date(start);
      if (!this.stopHours) stop = null;
      else stop.setHours(stop.getHours() + Number(this.stopHours));
      return { start, stop };
    }
  }
};
</script>
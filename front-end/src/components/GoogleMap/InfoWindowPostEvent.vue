<template>
  <div>
    <v-toolbar
      absolute
      flat
      dark
      scroll-off-screen
      color="blue-grey darken-2"
      scroll-target="#scrolling-techniques"
      height="35%"
    >
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeInfoWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form ref="form" v-model="valid">
      <v-card flat max-width="100%" class="mx-auto pt-4">
        <v-card-title class="pb-1 px-0">
          <div class="title">
            <v-icon>post_add</v-icon>แจ้งเหตุการณ์
          </div>
        </v-card-title>

        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex xs12 sm6 px-1>
              <v-text-field label="ชื่อเหตุการณ์" v-model="title" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 px-1>
              <v-select
                label="ประเภทเหตุการณ์"
                v-model="eventType"
                :items="items"
                item-text="label"
                item-value="value"
                :rules="[rules.required]"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 px-1>
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
            <v-flex xs12 sm6 px-1>
              <v-text-field
                v-model="stopHours"
                type="number"
                prepend-icon="timelapse"
                label="สิ้นสุดในอีกกี่ชั่วโมง"
                placeholder="ค่าเริ่มต้นระบบจะคำนวนให้"
                :rules="[rules.maxHours]"
              />
              <!-- <v-menu
                ref="stopMenu"
                v-model="stopMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="stop"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="230px"
                min-width="230px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="stop"
                    label="เวลาสิ้นสุดเหตุการณ์"
                    prepend-icon="timelapse"
                    placeholder="ค่าเริ่มต้นระบบจะคำนวนให้"
                    readonly
                    clearable
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="stopMenu"
                  v-model="stop"
                  full-width
                  format="24hr"
                  @click:minute="$refs.stopMenu.save(stop)"
                ></v-time-picker>
              </v-menu>-->
            </v-flex>
          </v-layout>
          <!------add image-------->
          <!-- <div v-if="!image">
          <input type="file" @change="onFileChange" />
        </div>
        <div v-else>
          <img :src="image" />
          <br />
          <v-btn color="secondary" dark @click="removeImage">ลบรูป</v-btn>
          </div>-->
          <!-- <v-btn block color="secondary" dark @click="$refs.file.click()">
          <v-icon>add_a_photo</v-icon>เพิ่มรูปภาพ
          </v-btn>-->
          <!------------ -->
          <v-textarea
            label="รายละเอียดเหตุการณ์"
            v-model="description"
            outline
            clearable
            :rules="[rules.required]"
          ></v-textarea>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red white--text" @click="dialog = false">ยกเลิก</v-btn>
          <v-btn
            color="blue white--text"
            :disabled="loading"
            :loading="loading"
            @click="submit"
          >แจ้งเหตุ</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import eventConstant from "@/utilitys/eventConstant";
export default {
  name: "InfoWindowPostEvent",
  props: {
    marker: Object,
    closeInfoWindow: Function
  },
  data() {
    return {
      valid: false,
      items: eventConstant.EVENT_CATEGORY_OBJECT,
      title: null,
      eventType: null,
      startTime: null,
      stopHours: null,
      startMenu: false,
      stopMenu: false,
      description: null,
      image: "",
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล",
        maxHours: value => value < 24 || "ระยะเวลาไม่เกิน 24 ชั่วโมง"
      },
      loading: false,
      success: false,
      error: false
    };
  },
  methods: {
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
    submit: async function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.success = false;
        this.error = false;
        const data = this.getEventData();
        try {
          console.log(data);

          // if (!this.id) {
          //   const { _id } = await directionRecord.postRecords(data);
          //   this.id = _id;
          // } else {
          //   const record = await directionRecord.patchRecordById(this.id, data);
          //   this.updateDirectionRecordById({ id: this.id, record });
          // }
          // this.success = true;
        } catch (error) {
          this.error = true;
        } finally {
          this.loading = false;
        }
      }
    },
    getEventData: function() {
      const { lat: latitude, lng: longitude } = this.marker.position;
      const { value: icon, type } = eventConstant.EVENT_CATEGORY_OBJECT.find(
        element => element.value === this.eventType
      );
      let startDate, stopDate;
      this.calculateDateTime(this.startTime);
      this.startTime
        ? (startDate = new Date(this.startTime))
        : (startDate = new Date());
      this.stop ? (stopDate = new Date(this.stop)) : (stopDate = null);
      return {
        title: this.title,
        description: this.description,
        latitude,
        longitude,
        start: startDate,
        stop: stopDate,
        contributor: this.$auth.profile.sub,
        icon,
        type,
        source: "follroad"
      };
    },
    calculateTimePicker: function(dateString) {
      const date = new Date();
      if (typeof dateString === "string") {
        const hours = dateString.match(/^(\d+)/)[1];
        const minutes = dateString.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      }
      return date;
    }
  }
};
</script>
<style>
</style>

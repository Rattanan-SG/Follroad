<template>
  <v-dialog v-model="dialog" persistent max-width="600px" scrollable>
    <v-form ref="form" v-model="valid" style="width:100%">
      <v-card>
        <v-toolbar color="red darken-3" dark flat>
          <v-icon>edit</v-icon>
          <v-toolbar-title>แก้ไขเหตุการณ์</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-layout row wrap>
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
            <v-flex xs12 pr-1>
              <v-text-field
                v-model="stopHours"
                type="number"
                prepend-icon="timelapse"
                label="ระยะเวลาสิ้นสุดของเหตุการณ์ นับจากเวลาปัจุบัน"
                placeholder="ถ้าไม่กรอกหรือใส่ 0 ระบบจะไม่แก้ไขเวลาสิ้นสุด"
                suffix="ชั่วโมง"
                hint="สามารถใส่ค่าได้แค่ 0-24 ชั่วโมง"
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
          <div
            v-if="pictures.length > 0"
            class="px-3 pb-2 subheading blue--text text--darken-4"
          >รูปภาพที่มีของเหตุการณ์นี้</div>
          <v-layout row wrap pb-2>
            <v-flex v-for="(picture, index) in pictures" :key="index" xs3 d-flex pa-1>
              <v-badge rigth overlap color="deep-orange ">
                <template v-slot:badge>
                  <v-icon dark small @click="deletePicture(index)">close</v-icon>
                </template>
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="picture.url"
                    :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-card>
              </v-badge>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <PictureUploadAndPreview
              id="editEventUpload"
              ref="editEventUpload"
              :destroyDropzone="true"
              @upload-error="error = true"
              @upload-complete="handleUploadComplete"
            />
          </v-flex>
          <v-alert :value="error" color="error" icon="warning" outline>แก้ไขเหตุการณ์ไม่สำเร็จ</v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">ยกเลิก</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            :disabled="loading"
            :loading="loading"
            @click="submit"
          >แก้ไข</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";
import PictureUploadAndPreview from "../Feedback/PictureUploadAndPreview";
export default {
  name: "EditEventDialog",
  components: {
    PictureUploadAndPreview
  },
  props: {
    value: Boolean,
    editEvent: Object
  },
  data() {
    return {
      valid: false,
      items: eventConstant.EVENT_CATEGORY_OBJECT,
      title: this.editEvent.title,
      eventType: this.editEvent.icon,
      stopHours: null,
      description: this.editEvent.description,
      pictures: [...this.editEvent.pictures],
      deletePictures: [],
      newPictures: [],
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล",
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
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions("globalFeedback", ["setLoginDialog", "openMessageSnackbar"]),
    deletePicture: function(index) {
      const removePicture = this.pictures.splice(index, 1);
      this.deletePictures.push(removePicture[0].id);
    },
    submit: async function() {
      if (!this.$auth.isAuthenticated) {
        this.setLoginDialog(true);
      } else if (this.$refs.form.validate()) {
        this.loading = true;
        this.error = false;
        const isUploading = this.$refs.editEventUpload.uploadFiles();
        if (!isUploading) {
          try {
            await this.patchEvent();
          } catch (error) {
            this.error = true;
          } finally {
            this.loading = false;
            this.dialog = false;
          }
        }
      }
    },
    handleUploadComplete: async function(eventValue) {
      this.newPictures = eventValue;
      try {
        await this.patchEvent();
      } catch (error) {
        this.error = true;
      } finally {
        this.newPictures = [];
        this.loading = false;
        this.dialog = false;
      }
    },
    patchEvent: async function() {
      const data = this.getEditEventData();
      await eventApi.patchEventById(this.editEvent.id, data);
      data.pictures = [...this.pictures, ...this.newPictures];
      console.log(data);

      this.$emit("edit-event-success", data);
    },
    getEditEventData: function() {
      const { value: icon, type } = eventConstant.EVENT_CATEGORY_OBJECT.find(
        element => element.value === this.eventType
      );
      const stop = this.calculateStop();
      return {
        title: this.title,
        description: this.description,
        stop,
        icon,
        type,
        deletePictures: this.deletePictures,
        newPictures: this.newPictures
      };
    },
    calculateStop: function() {
      let stop = new Date();
      if (!Number(this.stopHours)) stop = this.editEvent.stop;
      else {
        stop.setHours(stop.getHours() + Number(this.stopHours));
        stop = stop.toISOString();
      }
      return stop;
    }
  }
};
</script>

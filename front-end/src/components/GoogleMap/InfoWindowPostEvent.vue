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

    <v-card flat max-width="100%" class="mx-auto pt-4">
      <div class="headline">
        <v-icon>post_add</v-icon>แจ้งเหตุการณ์
      </div>
      <v-divider></v-divider>
      <v-text-field label="ชื่อเหตุการณ์" v-model="title" required></v-text-field>
      <v-select
        label="ประเภทเหตุการณ์"
        v-model="type"
        :items="items"
        item-text="label"
        item-value="value"
        required
      ></v-select>
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
      <v-textarea label="รายละเอียดเหตุการณ์" v-model="description" outline color="deep-purple"></v-textarea>
      <v-card-actions>
        <v-btn color="red" dark to="/">ยกเลิก</v-btn>
        <v-btn color="primary" dark>ยืนยัน</v-btn>
      </v-card-actions>
    </v-card>
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
      title: null,
      type: null,
      description: null,
      items: eventConstant.EVENT_CATEGORY_OBJECT,
      image: ""
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
  }
};
</script>
<style>
</style>

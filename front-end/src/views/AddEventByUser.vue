<template>
  <v-layout>
    <v-flex xs12 lg12 md12 pa-3>
      <v-card flat>
        <div class="headline">
          <v-icon>post_add</v-icon>แจ้งเหตุการณ์
        </div>
        <br />
        <v-divider></v-divider>
        <br />
        <v-text-field label="ชื่อเหตุการณ์" required></v-text-field>
        <v-select v-model="select" :items="items" label="ประเภท" required></v-select>
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
        <br />
        <v-textarea label="รายละเอียด" outline color="deep-purple"></v-textarea>
        
          <v-card-actions>
            <v-spacer/>
         
            <v-btn color="red" dark to="/">ยกเลิก</v-btn>
           
            <v-btn color="primary" dark>ยืนยัน</v-btn>

        </v-card-actions>
        
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "AddEventByUser",
  data() {
    return {
      select: null,
      items: [
        "รถเสีย",
        "อุบัติเหตุ",
        "น้ำท่วม",
        "ประกาศข่าว",
        "การจราจรติดขัด",
        "ประกาศเตือน",
        "ลดราคา",
        "ร้องเรียน",
        "ก่อสร้าง",
        "ฝนตก",
        "สาธิต",
        "ด่านตรวจ",
        "เบ็ดเตล็ด",
        "กิจกรรม-เทศกาล",
        "ไฟไหม่"
      ],
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
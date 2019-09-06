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
        <v-text-field label="ชื่อเหตุการณ์" required box></v-text-field>
        <v-select v-model="select" :items="items" label="ประเภท" required></v-select>
        <v-textarea label="รายละเอียด" outline color="deep-purple"></v-textarea>
        <!------add image-------->
        <input type="file" ref="file" style="display: none" />
        <v-btn block color="secondary" dark @click="$refs.file.click()">
          <v-icon>add_a_photo</v-icon>เพิ่มรูปภาพ
        </v-btn>
        <!-------------->
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
      ]
    };
  }
};
</script>
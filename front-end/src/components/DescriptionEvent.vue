<template>
  <v-container flat>
    <v-card class="mx-auto" max-width="100%">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

      <v-card flat>
        <h3>น้ำท่วมใหญ่</h3>
        <br />
        <span class="grey--text subtitle-1">น้ำท่วมที่บางมด มจธ เขตทุ่งครุ</span>
        <br />
        <v-spacer></v-spacer>
        <span class="grey--text subtitle-1">เหตุการณ์เกิดขึ้น ณ : 12.00 น.</span>
        <br />
        <span class="grey--text subtitle-1">สิ้นสุดเหตุการณ์ : 13.00 น.</span>
      </v-card>
      <v-text-field label="แสดงความคิดเห็น" outlined></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-card>
            <v-icon>person</v-icon>รถยังไม่หายติดเลย
          </v-card>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "DescriptionEvent",
  data: () => ({
    show: false
  })
};
</script>

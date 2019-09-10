<template>
  <div>
    <v-layout row justify-center class="hidden-sm-and-up">
      <v-flex xs12 lg12 md12 class="ToggleRecommendRoute">
        <v-btn color="green" dark @click.stop="dialog = true">ดูเส้นทางที่แนะนำอื่นๆ</v-btn>
      </v-flex>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-toolbar color="blue" dark flat>
            <v-icon>directions</v-icon>
            <v-toolbar-title>เส้นทางที่แนะนำ</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="recommendRoute">
            <v-checkbox
              v-for="(route, index) in directionsResponse.routes"
              :key="index"
              :value="index"
              :label="`${route.summary} ระยะทาง ${route.legs[0].distance.text} ประมาณ ${route.legs[0].duration.text}`"
            ></v-checkbox>
          </div>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click="dialog = false">ยกเลิก</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false">ตกลง</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ToggleRecommendRoute",
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters("direction", ["directionsResponse"])
  }
};
</script>
<style scoped>
.ToggleRecommendRoute {
  bottom: 3%;
  right: 25%;
  position: absolute;
  z-index: 1;
}
.recommendRoute {
  padding: 5%;
}
</style>
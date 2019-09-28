<template>
  <v-layout row justify-center class="hidden-sm-and-up">
    <v-flex xs12 lg12 md12 class="ToggleRecommendRoute">
      <v-btn round color="green" dark @click.stop="dialog = true">ดูเส้นทางที่แนะนำอื่นๆ</v-btn>
    </v-flex>
    <v-dialog v-model="dialog" hide-overlay max-width="300">
      <v-card>
        <v-toolbar color="blue" dark flat>
          <v-icon>directions</v-icon>
          <v-toolbar-title>เส้นทางที่แนะนำ</v-toolbar-title>
        </v-toolbar>
        <div class="px-4">
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio
              v-for="(route, index) in directionsResponse.routes"
              :key="index"
              :value="index"
              :label="`${route.summary} ระยะทาง ${route.legs[0].distance.text} ประมาณ ${route.legs[0].duration.text}`"
            ></v-radio>
          </v-radio-group>
        </div>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="dialog = false">ปิด</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="submit">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ToggleRecommendRoute",
  data() {
    return {
      dialog: false,
      radios: 0
    };
  },
  computed: {
    ...mapGetters("direction", ["directionsRenderer", "directionsResponse"])
  },
  methods: {
    ...mapActions("direction", ["selectRoute"]),
    submit: function() {
      this.directionsRenderer.setRouteIndex(this.radios);
      this.selectRoute(this.radios);
      this.dialog = false;
    }
  }
};
</script>
<style scoped>
.ToggleRecommendRoute {
  bottom: 7%;
  right: 14%;
  position: absolute;
  z-index: 1;
}
</style>
<template>
  <v-container flat>
    <v-card max-width="100%">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
      <v-card-title>
        <div>
          <v-flex md2 lg2>
            <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
          </v-flex>
          <v-flex xs12 md12 lg12>
            <h2>{{infoWindow.marker.title}}</h2>
            <div>โดย {{infoWindow.marker.eventCaption.contributor}}</div>
          </v-flex>
        </div>
      </v-card-title>
      <v-card-text>
        <div>{{infoWindow.marker.description}}</div>
      </v-card-text>
      <v-card-text>
        <div>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</div>
        <div>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</div>
      </v-card-text>
      <!-- <v-flex xs12 md12 lg12> -->

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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DescriptionEvent",
  data: () => ({
    dialog: false,
    show: false
  }),
  computed: {
    ...mapGetters(["infoWindow"])
  },
  methods: {
    ...mapActions(["closeInfoWindow"])
  }
};
</script>
<style scoped>
.v-card {
  height: 83vh;
  overflow: auto;
}
</style>

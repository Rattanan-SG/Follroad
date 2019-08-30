<template>
  <gmap-info-window
    v-if="infoWindow.marker"
    :options="infoWindow.infoOptions"
    :position="infoWindow.marker.position"
    :opened="infoWindow.infoWindowOpen"
    @closeclick="closeInfoWindow"
  >
    <v-toolbar
      absolute
      color="blue-grey darken-2"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      height="40%"
    >
      <v-flex lg12 xs12>
        <v-btn icon dark @click="closeInfoWindow">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
    </v-toolbar>
    <br />
    <br />
    <br />
    <v-layout>
      <!-- <v-flex xs12 sm12 lg12> -->
      <v-card color="blue-grey darken-2" class="white--text">
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
        <v-divider></v-divider>
        <v-flex xs12 md12 lg12>
          <v-btn flat icon color="blue lighten-2">
            <v-icon>thumb_up</v-icon>
          </v-btn>(23)
          <v-btn flat icon color="red lighten-2">
            <v-icon>thumb_down</v-icon>
          </v-btn>(23)
          <!-- <v-spacer></v-spacer> -->
          <v-btn outline color="blue" to="/details">ดูเพิ่มเติม</v-btn>
        </v-flex>
        <!-- </v-flex> -->
      </v-card>
      <!-- </v-flex> -->
    </v-layout>
  </gmap-info-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GoogleMapInfoWindow",
  data() {
    return {
      dialog: false
    };
  },

  computed: {
    ...mapGetters(["infoWindow"])
  },
  methods: {
    ...mapActions(["closeInfoWindow"])
  }
};
</script>
<style>
</style>

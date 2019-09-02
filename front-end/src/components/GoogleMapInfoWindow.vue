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

    <v-card max-width="100%" class="mx-auto" flat>
      <v-layout>
        <v-flex xs12 md12 lg12>
          <v-list>
            <v-list-tile>
              <v-list-tile-avatar>
                <img :src="infoWindow.marker.icon" max-width="40" max-height="40" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{infoWindow.marker.title}}</v-list-tile-title>
                <v-list-tile-sub-title>โดย {{infoWindow.marker.eventCaption.contributor}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-text>
            <div>{{infoWindow.marker.description}}</div>
          </v-card-text>
          <v-card-text>
            <div>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</div>
            <div>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</div>
          </v-card-text>

          <v-divider></v-divider>

          <v-flex xs12 md12 lg12>
            <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            {{countLike}}
            <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            {{countDislike}}
            <!-- <v-spacer></v-spacer> -->
            <v-btn outline color="blue" to="/details">ดูเพิ่มเติม</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-card>
  </gmap-info-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GoogleMapInfoWindow",
  data() {
    return {
      dialog: false,
      countLike: 0,
      countDislike: 0
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

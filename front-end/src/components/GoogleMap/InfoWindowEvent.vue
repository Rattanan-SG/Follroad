<template>
  <div>
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

    <v-card max-width="100%" class="mx-auto pa-0" flat>
      <v-list class="px-0">
        <v-list-tile class="pa-0">
          <v-list-tile-avatar class="pa-0">
            <img :src="marker.icon" max-width="40" max-height="40" />
          </v-list-tile-avatar>
          <v-list-tile-content class="pa-0">
            <v-list-tile-title>{{marker.title}}</v-list-tile-title>
            <v-list-tile-sub-title>โดย {{marker.eventCaption.contributor}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-text class="pa-0">
        <div>{{marker.description}}</div>

        <br />
        <v-divider></v-divider>
        <br />
      </v-card-text>
      <v-card-text class="pa-0">
        <div>เกิดเหตุการณ์ขึ้น ณ : {{marker.eventCaption.startTime}}</div>
        <div>จะสิ้นสุดใน : {{marker.eventCaption.stopTime}}</div>
      </v-card-text>

      <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
        <v-icon>thumb_up</v-icon>
      </v-btn>
      {{countLike}}
      <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
        <v-icon>thumb_down</v-icon>
      </v-btn>
      {{countDislike}}
      <!-- <v-spacer></v-spacer> -->
      <v-btn outline color="blue" to="/details" @click="setRouterView(true)">ดูเพิ่มเติม</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "InfoWindowEvent",
  props: {
    marker: Object,
    closeInfoWindow: Function
  },
  data() {
    return {
      countLike: 0,
      countDislike: 0
    };
  },
  methods: {
    ...mapActions("route", ["setRouterView"])
  }
};
</script>
<style>
</style>

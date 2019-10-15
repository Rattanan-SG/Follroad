<template>
  <div>
    <v-toolbar
      absolute
      flat
      dark
      scroll-off-screen
      color="blue darken-3"
      scroll-target="#scrolling-techniques"
      height="35%"
    >
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeInfoWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card flat max-width="100%" class="mx-auto pt-4">
      <v-list>
        <v-list-tile avatar class="my-tile">
          <v-list-tile-avatar tile>
            <v-img :src="marker.icon" max-width="25" max-height="25"></v-img>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="blue--text">{{marker.title}}</v-list-tile-title>
            <v-list-tile-sub-title>โดย {{marker.eventCaption.contributor}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-text class="pa-0">
        <div class="body-2">{{marker.description}}</div>
        <br />
        <v-divider></v-divider>
        <br />
      </v-card-text>
      <v-card-text class="pa-0">
        <div
          class="body-1 red--text"
        >เกิดขึ้น ณ {{marker.eventCaption.startTime | luxon:locale('short')}}</div>
        <div
          class="body-1 red--text"
        >จะสิ้นสุดใน {{marker.eventCaption.stopTime | luxon:locale('short')}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
          <v-icon>thumb_up</v-icon>
        </v-btn>
        {{countLike}}
        <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
          <v-icon>thumb_down</v-icon>
        </v-btn>
        {{countDislike}}
        <v-spacer></v-spacer>
        <v-btn outline color="blue" to="/details" @click="setRouterView(true)">ดูเพิ่มเติม</v-btn>
      </v-card-actions>
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
<style scoped>
>>> .my-tile .v-list__tile {
  padding-left: 3px;
  padding-right: 0px;
}
</style>

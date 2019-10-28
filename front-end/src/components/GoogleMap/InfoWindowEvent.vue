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
            <v-list-tile-sub-title>โดย {{marker.contributor}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!---------ใส่รูปเวลามีคนเพิ่มรูปเข้ามา---------->
      <!-- <v-carousel hide-delimiters width="50%" height="50%">
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>-->
      <!--------------------------------------->
      <v-card-text class="pa-1">
        <div class="body-2">{{marker.description}}</div>
        <br />
        <v-divider></v-divider>
      </v-card-text>
      <v-card-text class="px-0">
        <div class="body-1 red--text">เกิดขึ้น ณ {{marker.startTime | luxon:locale('short')}}</div>
        <div class="body-1 red--text">จะสิ้นสุดใน {{marker.stopTime | luxon:locale('short')}}</div>
      </v-card-text>
      <v-card-actions class="px-0">
        <LikeDislikeControl :key="marker.id" :eventId="marker.id" />
        <v-spacer></v-spacer>
        <v-btn outline color="blue" :to="{path: `/details/${marker.id}`}" @click="setRouterView(true)">ดูเพิ่มเติม</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LikeDislikeControl from "../Feedback/LikeDislikeControl";
export default {
  name: "InfoWindowEvent",
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        }
      ]
    };
  },
  components: {
    LikeDislikeControl
  },
  props: {
    marker: Object,
    closeInfoWindow: Function
  },
  methods: {
    ...mapActions("route", ["setRouterView"])
  }
};
</script>
<style scoped>
::v-deep .my-tile .v-list__tile {
  padding-left: 3px;
  padding-right: 0px;
}
</style>

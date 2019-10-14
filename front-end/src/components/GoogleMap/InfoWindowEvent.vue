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

    <v-card flat max-width="100%" class="mx-auto pt-3">
      <v-layout row wrap align-start justify-center fill-height>
        <v-layout>
          <v-flex xs3 md1 lg1 sm2 mt-3 ml-1>
            <img :src="marker.icon" max-width="40" max-height="40" />
          </v-flex>
          <v-flex xs12 md11 lg11 sm9 mt-3>
            <!-- <v-card-title primary-title> -->
              <div>
                <h3 class="blue--text">{{marker.title}}</h3>
                <div>โดย {{marker.eventCaption.contributor}}</div>
              </div>
            <!-- </v-card-title> -->
          </v-flex>
        </v-layout>

        <v-flex xs12 md12 lg12 sm12 mt-3>
          <span>{{marker.description}}</span>
          <br>
          <br>
          <!-- <v-card-title> -->
            <span class="red--text">
              เกิดขึ้น ณ
              : {{marker.eventCaption.startTime | luxon:locale('short')}}
              <br />
              จะสิ้นสุดใน
              : {{marker.eventCaption.stopTime | luxon:locale('short')}}
              <br />
            </span>
          <!-- </v-card-title> -->
        </v-flex>
        <v-flex xs8 md10 lg10 sm8>
          <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
            <v-icon>thumb_up</v-icon>
          </v-btn>
          {{countLike}}
          <!-- </v-flex> -->
          <!-- <v-flex xs4 md3 lg3 sm3> -->
            <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            {{countDislike}}
          <!-- </v-flex> -->
        </v-flex>
          <!-- <v-flex lg2></v-flex> -->
          <v-flex xs4 md2 lg2 sm4>
            <v-btn flat small right color="blue" to="/details" @click="setRouterView(true)">ดูเพิ่มเติม</v-btn>
          </v-flex>
      </v-layout>
  </v-card>

    <!-- <v-card flat max-width="100%" class="mx-auto pt-4 pa-0">
      <v-list>
        <v-list-tile> 
          <v-list-tile-avatar>
            <img :src="marker.icon" max-width="40" max-height="40" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="blue--text">{{marker.title}}</v-list-tile-title>
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
    </v-card> -->
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
.v-card {
  overflow: hidden;
}
</style>

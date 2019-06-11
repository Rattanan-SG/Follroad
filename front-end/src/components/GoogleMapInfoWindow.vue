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
      color="teal lighten-3"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      height="40%"
    >
      <v-flex xs1>
        <v-btn icon dark @click="closeInfoWindow">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs9></v-flex>
      <v-flex xs2>
        <span>รายงาน</span>
        <v-btn icon>
          <v-icon>report</v-icon>
        </v-btn>
      </v-flex>
    </v-toolbar>
    <br>
    <br>
    <br>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="cyan gradient" class="white--text">
            <v-layout>
              <v-flex xs5>
                <!--ไว้ใส่รูปที่  user แจ้งเข้ามา-->
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <h3>{{infoWindow.marker.title}}</h3>
                    <br>
                    <div>{{infoWindow.marker.description}}</div>
                    <br>
                    <v-divider></v-divider>
                    <br>
                    <template v-if="infoWindow.marker.eventCaption">
                      <p>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</p>
                      <p>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</p>
                      <p>ลงข้อมูลโดย : {{infoWindow.marker.eventCaption.contributor}}</p>
                    </template>
                    <template v-if="infoWindow.marker.searchPlaceCaption">
                      <img
                        :src="infoWindow.marker.searchPlaceCaption.photo"
                        :alt="infoWindow.marker.title"
                        width="350"
                        height="200"
                      >
                    </template>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              ให้คะแนนเหตุการณ์
              <v-spacer></v-spacer>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- <h2>{{infoWindow.marker.title}}</h2>
    <br>
    <p>{{infoWindow.marker.description}}</p>
    <v-divider/>
    <br>
    <template v-if="infoWindow.marker.eventCaption">
      <p>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</p>
      <p>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</p>
      <p>ลงข้อมูลโดย : {{infoWindow.marker.eventCaption.contributor}}</p>
    </template>
    <template v-if="infoWindow.marker.searchPlaceCaption">
      <img
        :src="infoWindow.marker.searchPlaceCaption.photo"
        :alt="infoWindow.marker.title"
        width="350"
        height="200"
      >
    </template>-->
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

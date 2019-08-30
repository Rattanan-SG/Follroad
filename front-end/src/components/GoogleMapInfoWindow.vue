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
      color="blue"
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
        <!-- <v-flex xs12 lg12 mt-5>
          <v-list-tile avatar ripple to>
            <v-list-tile-action>
              <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
            </v-list-tile-action>

            <v-list-item-content>
              <v-list-item-title class="headline">{{infoWindow.marker.title}}</v-list-item-title>
              <br />
              <v-list-item-subtitle>by {{infoWindow.marker.eventCaption.contributor}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-tile>
        </v-flex>-->
        <br />
        <br />
        <br />
        <v-list-tile-action>
          <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
        </v-list-tile-action>
        <v-list-item three-line>
          <v-list-item-content class="align-self-start">
            <!-- <v-list-item-title class="headline mb-">{{infoWindow.marker.title}}</v-list-item-title> -->

            <h3>{{infoWindow.marker.title}}</h3>
            <v-list-item-subtitle>by {{infoWindow.marker.eventCaption.contributor}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-layout>

      <v-layout>
        <v-flex xs12 md12 lg12>
          <v-card-title primary-title>
            <div>
              <div>
                <v-list-item-title>{{infoWindow.marker.description}}</v-list-item-title>
              </div>
              <br />
              <v-divider></v-divider>
              <br />
              <template v-if="infoWindow.marker.eventCaption">
                <p>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</p>
                <p>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</p>
              </template>
              <template v-if="infoWindow.marker.searchPlaceCaption">
                <img
                  :src="infoWindow.marker.searchPlaceCaption.photo"
                  :alt="infoWindow.marker.title"
                  width="350"
                  height="200"
                />
              </template>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs9 md9 lg9>
          <div>
            <v-btn flat icon color="blue lighten-2">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-list-item-subtitle>(23)</v-list-item-subtitle>
            <v-btn flat icon color="red lighten-2">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            <v-list-item-subtitle>(23)</v-list-item-subtitle>
          </div>
        </v-flex>
        <v-flex xs2 md2 lg2>
          <v-card-actions>
            <v-btn text color="white" to="/details">See More</v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
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

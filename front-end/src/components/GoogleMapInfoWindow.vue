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

    <v-card max-width="344" class="mx-auto">
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
        <v-list-tile-action>
          <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
        </v-list-tile-action>
        <v-list-item three-line>
          <v-list-item-content class="align-self-start">
            <v-list-item-title class="headline mb-2">{{infoWindow.marker.title}}</v-list-item-title>
            <br />
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

      <v-card-actions>
        <v-btn class="hidden-sm-and-down" text color="white">See More</v-btn>
        <v-btn class="hidden-sm-and-up" icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
        </div>
      </v-expand-transition>
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

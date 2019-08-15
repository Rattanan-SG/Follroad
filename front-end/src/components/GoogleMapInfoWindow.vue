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

    <!--<v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="blue" class="white--text">
            <v-layout>
              <v-flex xs5 class="hidden-sm-and-down">
                
              </v-flex>
              <v-flex lg7 xs12>
                <v-card-title primary-title>
                  <div>
                    <h3>{{infoWindow.marker.title}}</h3>
                    <br />
                    <div>{{infoWindow.marker.description}}</div>
                    <br />
                    <v-divider></v-divider>
                    <br />
                    <template v-if="infoWindow.marker.eventCaption">
                      <p>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</p>
                      <p>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</p>
                      <p>ลงข้อมูลโดย : {{infoWindow.marker.eventCaption.contributor}}</p>
                      <v-btn color="warning" to="/details">ดูเพิ่มเติม</v-btn>
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
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              
              ให้คะแนนเหตุการณ์
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>-->

    <v-card max-width="344" class="mx-auto">
      <v-layout>
        <v-flex xs12 lg12 mt-5>
          <v-list-tile :key="index" avatar ripple to>
            <v-list-tile-action>
              <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
            </v-list-tile-action>

            <v-list-item-content>
              <v-list-item-title class="headline">{{infoWindow.marker.title}}</v-list-item-title>
              <br />
              <v-list-item-subtitle>by {{infoWindow.marker.eventCaption.contributor}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-tile>
        </v-flex>
      </v-layout>

      <!-- <v-list-item>
      <v-flex xs11 md11 lg11>
       <v-img :src=infoWindow.marker.icon max-width="30"
      max-height="30"></v-img>
      
      <v-list-item-content>
        <v-list-item-title class="headline">{{infoWindow.marker.title}}</v-list-item-title>
        <br>
        <v-list-item-subtitle>by {{infoWindow.marker.eventCaption.contributor}}</v-list-item-subtitle>
      </v-list-item-content>
      </v-flex>
      </v-list-item>-->

      <v-layout>
        <v-flex xs11 md11 lg11>
          <v-card-title primary-title>
            <div>
              <div>
                <h3>{{infoWindow.marker.description}}</h3>
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
        <v-btn text color="white">Read</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
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

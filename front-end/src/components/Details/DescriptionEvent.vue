<template>
  <v-container flat>
    <v-card max-width="100%" flat>
      <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img> -->

      <v-layout>
        <v-flex xs12 md12 lg12>
          <v-layout>
            <v-flex xs2 md2 lg2 mt-4 ml-4>
              <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
            </v-flex>
            <v-flex xs10 md10 lg10>
              <v-card-title primary-title>
                <div>
                  <h3>{{infoWindow.marker.title}}</h3>
                  <div>โดย {{infoWindow.marker.eventCaption.contributor}}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>

          <v-card-text>
            <div>{{infoWindow.marker.description}}</div>
            <br />
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text>
            <div>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</div>
            <div>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</div>
          </v-card-text>

          <v-flex xs12 md12 lg12>
            <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            {{countLike}}
            <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            {{countDislike}}
          </v-flex>
        </v-flex>
      </v-layout>

      <v-text-field label="แสดงความคิดเห็น" outlined></v-text-field>

      <v-layout>
        <v-flex xs2 md2 lg2 mt-4 ml-4>
          <v-icon>person</v-icon>
        </v-flex>
        <v-flex xs10 md10 lg10>
          <v-card-title primary-title>
            <h3>WinnerZaza</h3>
            <v-list-tile-sub-title>15 mins</v-list-tile-sub-title>
            <br />
            <h4>sadsakdjsalkdlsakld</h4>
          </v-card-title>
        </v-flex>
      </v-layout>

      <!-- <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-card>
            <v-icon>person</v-icon>รถยังไม่หายติดเลย
          </v-card>
        </div>
      </v-expand-transition>-->
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DescriptionEvent",
  data: () => ({
    dialog: false,
    show: false,
    countLike: 0,
    countDislike: 0
  }),
  computed: {
    ...mapGetters("infoWindow", ["infoWindow"])
  },
  methods: {
    ...mapActions("infoWindow", ["closeInfoWindow"])
  }
};
</script>
<style scoped>
.v-card {
  height: 83vh;
  overflow: auto;
}
</style>

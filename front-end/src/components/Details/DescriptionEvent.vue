<template>
  <v-container flat>
    <v-card max-width="100%" class="mx-auto" flat>
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
      <br />

      <v-layout>
        <v-list-tile-action>
          <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
        </v-list-tile-action>
        <v-list-item three-line>
          <v-list-item-content class="align-self-start">
            <!-- <v-list-item-title class="headline mb-">{{infoWindow.marker.title}}</v-list-item-title> -->

            <h2>{{infoWindow.marker.title}}</h2>
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
                <v-layout>
                  <v-divider></v-divider>
                  <v-flex xs12 md12 lg12>
                    <v-btn flat icon color="blue lighten-2">
                      <v-icon>thumb_up</v-icon>
                    </v-btn>
                    <v-list-item-subtitle>(23)</v-list-item-subtitle>
                    <v-btn flat icon color="red lighten-2">
                      <v-icon>thumb_down</v-icon>
                    </v-btn>
                    <v-list-item-subtitle>(23)</v-list-item-subtitle>
                  </v-flex>
                </v-layout>
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

      <v-text-field label="แสดงความคิดเห็น" outlined></v-text-field>
      <v-card-actions>
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
      </v-expand-transition>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DescriptionEvent",
  data: () => ({
    dialog: false,
    show: false
  }),
  computed: {
    ...mapGetters(["infoWindow"])
  },
  methods: {
    ...mapActions(["closeInfoWindow"])
  }
};
</script>
<style scoped>
.v-card {
  height: 83vh;
  overflow: auto;
}
</style>

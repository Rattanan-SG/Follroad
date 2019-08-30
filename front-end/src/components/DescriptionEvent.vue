<template>
  <v-container flat>
    <v-card class="mx-auto" max-width="100%" flat>
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

      <v-card flat>
        <h2>{{infoWindow.marker.title}}</h2>
        <v-list-item-subtitle>by {{infoWindow.marker.eventCaption.contributor}}</v-list-item-subtitle>
        <br />

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
      </v-card>
      <v-text-field label="แสดงความคิดเห็น" outlined></v-text-field>
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

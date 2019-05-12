<template>
  <gmap-info-window
    v-if="infoWindow.marker"
    :options="infoWindow.infoOptions"
    :position="infoWindow.marker.position"
    :opened="infoWindow.infoWindowOpen"
    @closeclick="closeInfoWindow"
  >
    <h2>{{infoWindow.marker.title}}</h2>
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
    </template>
  </gmap-info-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GoogleMapInfoWindow",
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

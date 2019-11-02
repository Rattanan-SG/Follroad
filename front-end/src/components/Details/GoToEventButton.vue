<template>
  <v-btn flat icon color="grey" @click="goToEventMarker">
    <v-icon>room</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "GoToEventButton",
  props: {
    latitude: Number,
    longitude: Number
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("googleMap", ["setCenter", "setZoomLevel"]),

    goToEventMarker: function() {
      this.$vuetify.breakpoint.xsOnly
        ? this.setRouterView(false)
        : this.setRouterView(true);
      this.setCenter({ lat: this.latitude, lng: this.longitude });
      this.setZoomLevel(15);
    }
  }
};
</script>
<style scoped>
</style>

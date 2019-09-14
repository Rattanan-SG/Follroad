<template>
  <gmap-info-window
    v-if="infoWindow.marker"
    :position="infoWindow.marker.position"
    :options="infoWindow.infoOptions"
    :opened="infoWindow.infoWindowOpen"
  >
    <InfoWindowEvent
      v-if="infoWindow.marker.type === 'event'"
      :marker="infoWindow.marker"
      :closeInfoWindow="closeInfoWindow"
    />
    <InfoWindowPostEvent
      v-if="infoWindow.marker.type === 'postEvent'"
      :marker="infoWindow.marker"
      :closeInfoWindow="closeInfoWindow"
    />
    <InfoWindowSearchPlace
      v-if="infoWindow.marker.type === 'searchPlace'"
      :marker="infoWindow.marker"
      :closeInfoWindow="closeInfoWindow"
    />
  </gmap-info-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InfoWindowEvent from "./InfoWindowEvent";
import InfoWindowPostEvent from "./InfoWindowPostEvent";
import InfoWindowSearchPlace from "./InfoWindowSearchPlace";
export default {
  name: "GoogleMapInfoWindow",
  components: {
    InfoWindowEvent,
    InfoWindowPostEvent,
    InfoWindowSearchPlace
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("infoWindow", ["infoWindow"])
  },
  methods: {
    ...mapActions("infoWindow", ["closeInfoWindow"])
  }
};
</script>
<style>
</style>

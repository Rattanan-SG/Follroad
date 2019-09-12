<template>
  <div>
    <gmap-marker
      v-for="eventMarker in eventMarkers"
      :key="eventMarker.id"
      :position="eventMarker.position"
      :title="eventMarker.title"
      :icon="eventMarker.icon"
      @click="setInfoWindow(eventMarker)"
    ></gmap-marker>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MarkerEvent",
  computed: {
    ...mapGetters("event", ["eventMarkers"])
  },
  methods: {
    ...mapActions("infoWindow", ["setInfoWindow"])
  }
};
</script>
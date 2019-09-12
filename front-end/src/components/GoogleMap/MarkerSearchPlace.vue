<template>
  <gmap-marker
    v-if="searchPlaceMarker"
    :position="searchPlaceMarker.position"
    :title="searchPlaceMarker.title"
    @click="setInfoWindow(searchPlaceMarker)"
  ></gmap-marker>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MarkerSearchPlace",
  computed: {
    ...mapGetters("search", ["searchPlaceMarker"])
  },
  methods: {
    ...mapActions("infoWindow", ["setInfoWindow"])
  }
};
</script>
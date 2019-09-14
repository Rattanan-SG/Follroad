<template>
  <gmap-marker
    v-if="postEventMarker"
    :position="postEventMarker.position"
    :title="postEventMarker.title"
    @click="setInfoWindow(postEventMarker)"
  ></gmap-marker>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MarkerSearchPlace",
  computed: {
    ...mapGetters("postEvent", ["postEventMarker"])
  },
  watch: {
    postEventMarker(value) {
      if (value) this.setInfoWindow(this.postEventMarker);
    }
  },
  methods: {
    ...mapActions("infoWindow", ["setInfoWindow"])
  }
};
</script>
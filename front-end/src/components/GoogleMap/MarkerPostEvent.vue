<template>
  <gmap-marker
    v-if="postEventMarker"
    :position="postEventMarker.position"
    :title="postEventMarker.title"
    :animation="2"
    :icon="postEventMarker.icon"
    @click="setInfoWindow(postEventMarker)"
  ></gmap-marker>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MarkerPostEvent",
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
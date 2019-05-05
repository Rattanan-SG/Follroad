<template>
  <v-list-tile avatar @click="toggleInfoWindow" v-ripple>
    <v-list-tile-content>
      <v-list-tile-title>{{event.title}}</v-list-tile-title>
      <v-list-tile-sub-title>{{event.start}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HomeFeedItem",
  props: {
    event: Object
  },
  computed: {
    ...mapGetters(["markerByEventId"])
  },
  methods: {
    ...mapActions(["setShowRouterView", "setInfoWindow"]),
    toggleInfoWindow: function() {
      this.setInfoWindow(this.markerByEventId(this.event.eid));
      if (this.$vuetify.breakpoint.xsOnly) {
        this.setShowRouterView(false);
      }
    }
  }
};
</script>
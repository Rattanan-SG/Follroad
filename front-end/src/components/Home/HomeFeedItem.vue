<template>
  <v-list-tile avatar @click="toggleInfoWindow" v-ripple>
    <v-list-tile-avatar>
      <v-img :src="getIcon()" max-width="40" max-height="40"></v-img>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{event.title}}</v-list-tile-title>
      <v-list-tile-sub-title>{{event.start}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import eventService from "@/utilitys/eventService.js";
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
    },
    getIcon: function() {
      return eventService.selectIcon(this.event);
    }
  }
};
</script>
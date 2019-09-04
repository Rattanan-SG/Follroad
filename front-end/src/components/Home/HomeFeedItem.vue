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
import eventConstant from "@/utilitys/eventConstant";
export default {
  name: "HomeFeedItem",
  props: {
    event: Object
  },
  computed: {
    ...mapGetters("event", ["eventMarkerByEventId"])
  },
  methods: {
    ...mapActions("infoWindow", ["setInfoWindow"]),
    ...mapActions("route", ["setRouterView"]),
    toggleInfoWindow: function() {
      this.setInfoWindow(this.eventMarkerByEventId(this.event.id));
      if (this.$vuetify.breakpoint.xsOnly) {
        this.setRouterView(false);
      }
    },
    getIcon: function() {
      return eventConstant.selectIcon(this.event.type);
    }
  }
};
</script>
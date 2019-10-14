<template>
  <!-- <v-list-tile avatar @click="toggleInfoWindow" v-ripple>
    <v-list-tile-avatar>
      <v-img :src="getIcon()" max-width="40" max-height="40"></v-img>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{event.title}}</v-list-tile-title>
      <v-list-tile-sub-title>เกิดขึ้น ณ {{ event.start | luxon:locale('short') }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile> -->
  <v-card flat class="mb-4" @click="toggleInfoWindow" v-ripple>
    <v-layout>
      <v-flex xs1 md1 lg1 ml-3>
        <v-img :src="getIcon()" max-width="35" max-height="35" left></v-img>
      </v-flex>
      <v-flex xs11 md11 lg11 ml-3>
        <h4 class="blue--text">{{event.title}}</h4>
        <div>เกิดขึ้น ณ {{ event.start | luxon:locale('short') }}</div>
      </v-flex>
    </v-layout>
  </v-card>
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
      return eventConstant.selectIcon(this.event);
    }
  }
};
</script>
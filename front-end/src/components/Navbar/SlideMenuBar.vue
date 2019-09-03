<template>
  <v-navigation-drawer
    :clipped="drawer.clipped"
    :fixed="drawer.fixed"
    :permanent="drawer.permanent"
    :mini-variant="drawer.mini"
    v-model="drawer.open"
    app
    class="hidden-sm-and-down"
  >
    <v-list>
      <v-list-tile v-if="!drawer.permanent" @click="makeDrawerPermanent">
        <v-tooltip bottom close-delay="10">
          <template v-slot:activator="{ on }">
            <v-list-tile-action v-on="on">
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Static Drawer</v-list-tile-title>
            </v-list-tile-content>
          </template>
          <span>Static Drawer</span>
        </v-tooltip>
      </v-list-tile>

      <!-- <v-list-tile @click="toggleMiniDrawer">
          <v-tooltip bottom close-delay="10">
            <template v-slot:activator="{ on }">
              <v-list-tile-action v-on="on">
                <v-icon>aspect_ratio</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Mini Drawer</v-list-tile-title>
              </v-list-tile-content>
            </template>
            <span>Mini Drawer</span>
          </v-tooltip>
      </v-list-tile>-->

      <v-divider />

      <v-list-tile
        v-for="list in lists"
        :key="list.text"
        :to="list.route"
        router
        @click="toggleRouterView(list.route)"
      >
        <v-tooltip bottom close-delay="10">
          <template v-slot:activator="{ on }">
            <v-layout align-end fill-height>
              <v-list-tile-action v-on="on">
                <v-icon>{{list.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{list.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-layout>
          </template>
          <span>{{list.text}}</span>
        </v-tooltip>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SlideMenuBar",
  data() {
    return {
      drawer: {
        open: false,
        clipped: false,
        fixed: false,
        permanent: false,
        mini: true
      },
      lists: [
        { text: "Feed", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Profile", icon: "person", route: "/profile" }
      ],
      activeRouter: "/"
    };
  },
  computed: {
    ...mapGetters("route", ["routerView"])
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    toggleRouterView: function(route) {
      if (this.activeRouter == route) {
        this.setRouterView(!this.routerView);
      } else {
        this.activeRouter = route;
        this.setRouterView(true);
      }
    },
    makeDrawerPermanent() {
      this.drawer.permanent = true;
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    },
    toggleMiniDrawer() {
      this.drawer.mini = !this.drawer.mini;
    },
    toggleDrawer() {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        this.drawer.open = !this.drawer.open;
      }
    }
  }
};
</script>
<style scoped>
</style>

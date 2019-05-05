<template>
  <div>
    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      app
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
        <v-divider></v-divider>
        <v-list-tile
          v-for="list in lists"
          :key="list.text"
          :to="list.route"
          router
          @click="toggleRouterView(list.route)"
        >
          <v-tooltip bottom close-delay="10">
            <template v-slot:activator="{ on }">
              <v-list-tile-action v-on="on">
                <v-icon>{{list.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{list.text}}</v-list-tile-title>
              </v-list-tile-content>
            </template>

            <span>{{list.text}}</span>
          </v-tooltip>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title
        class="hidden-sm-and-down"
        style="overflow: unset; margin-left: 10px"
      >Follroad</v-toolbar-title>
      <gmap-autocomplete
        @place_changed="setPlace"
        style="width:100% "
        class="pa-2 ml-2 subheading"
        ref="autocomplete"
        placeholder="ค้นหาสถานที่"
        :select-first-on-enter="true"
      ></gmap-autocomplete>
      <v-btn v-if="!searchPlace" icon @click="search">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn v-else icon @click="clear">
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn icon @click="startDirections">
        <v-icon>directions</v-icon>
      </v-btn>
      <v-btn icon @click="installer()" :style="{'display' : installBtn}">
        <v-icon>mobile_friendly</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "../main";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: {
        open: true,
        clipped: false,
        fixed: false,
        permanent: true,
        mini: true
      },
      toolbar: {
        fixed: true,
        clippedLeft: false
      },
      lists: [
        { text: "Home", icon: "home", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Feed", icon: "today", route: "/news" }
      ],
      activeRouter: null,
      installBtn: "none",
      installer: null
    };
  },
  computed: {
    ...mapGetters(["myLocation", "searchPlace", "showRouterView"])
  },
  created() {
    let installPrompt;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installer = () => {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        installPrompt = null;
        this.installBtn = "none";
      });
    };
  },
  methods: {
    ...mapActions([
      "setCenter",
      "setZoomLevel",
      "setSearchPlace",
      "setDirection",
      "setShowRouterView"
    ]),
    toggleRouterView: function(route) {
      if (this.activeRouter == route) {
        this.setShowRouterView(!this.showRouterView);
      } else {
        this.activeRouter = route;
        this.setShowRouterView(true);
      }
    },
    setPlace: function(place) {
      if (place) {
        if (place.geometry) {
          this.setSearchPlace(place);
          this.search();
        }
      }
    },
    search: function() {
      if (this.searchPlace) {
        this.setCenter(this.searchPlace.geometry.location);
        this.setZoomLevel(17);
        this.$router.push("/search");
        this.activeRouter = "/search";
        this.$vuetify.breakpoint.xsOnly
          ? this.setShowRouterView(false)
          : this.setShowRouterView(true);
      }
    },
    clear: function() {
      this.$refs.autocomplete.$el.value = null;
      this.setSearchPlace(null);
      this.setDirection(null);
      this.setZoomLevel(15);
      eventBus.stopDirections();
      this.$router.push("/");
      this.activeRouter = "/";
    },
    startDirections: function() {
      if (this.searchPlace && this.myLocation) {
        eventBus.startDirections(
          this.myLocation.location,
          this.searchPlace.geometry.location
        );
        this.$router.push("/search");
        this.activeRouter = "/search";
        this.$vuetify.breakpoint.xsOnly
          ? this.setShowRouterView(false)
          : this.setShowRouterView(true);
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
::placeholder {
  color: white;
}
</style>

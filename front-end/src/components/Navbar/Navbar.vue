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
        <v-divider />
        <v-list-tile
          v-for="list in lists"
          :key="list.text"
          :to="list.route"
          @click="setRouterView(true)"
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
    <v-toolbar
      color="blue darken-3"
      dark
      app
      flat
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer" class="hidden-xs-only"></v-toolbar-side-icon>

      <v-toolbar-title class="hidden-xs-only" style="overflow: unset; margin-left: 10px">Follroad</v-toolbar-title>

      <gmap-autocomplete
        @place_changed="search"
        style="background-color: #0080FF; width:50%; height:70%"
        class="pa-2 ml-4 subheading"
        ref="gmapAutocomplete"
        placeholder="ค้นหาสถานที่"
        :select-first-on-enter="true"
      ></gmap-autocomplete>

      <v-btn v-if="!searchPlace" icon @click="startDirections" to="/search">
        <v-icon>directions</v-icon>
      </v-btn>
      <v-btn v-else icon @click="clearSearch">
        <v-icon>close</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="installBtn" icon @click="installer()">
        <v-icon>mobile_friendly</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" outline @click.prevent="login">Log in</v-btn>
      <v-btn v-else icon to="/profile" @click="setRouterView(true)">
        <v-avatar size="35px">
          <img :src="profile.picture" alt="avatar" />
        </v-avatar>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "@/main";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: {
        open: false,
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
        { text: "Home", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Profile", icon: "person", route: "/profile" }
      ],
      installBtn: false,
      installer: null,
      isAuthenticated: false,
      profile: this.$auth.profile
    };
  },
  computed: {
    ...mapGetters("googleMap", ["myLocation"]),
    ...mapGetters("search", ["searchPlace"])
  },
  created() {
    let installPrompt;
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = true;
    });
    this.installer = () => {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        installPrompt = null;
        this.installBtn = false;
      });
    };
  },
  watch: {
    searchPlace(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.$refs.gmapAutocomplete.$el.value = newValue.name;
        if (oldValue) this.search(newValue);
      } else {
        this.$refs.gmapAutocomplete.$el.value = null;
      }
    }
  },
  methods: {
    ...mapActions("googleMap", ["setCenter", "setZoomLevel"]),
    ...mapActions("search", ["setSearchPlace"]),
    ...mapActions("direction", ["setDirection"]),
    ...mapActions("route", ["setRouterView"]),
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
    },
    search: function(place) {
      console.log("se", place);
      if (place) {
        this.setSearchPlace(place);
        this.setCenter(place.geometry.location);
        this.setZoomLevel(17);
        this.goToThisPage("/search");
      }
    },
    clearSearch: function() {
      this.$refs.gmapAutocomplete.$el.value = null;
      this.setSearchPlace(null);
      this.setDirection(null);
      eventBus.stopDirections();
      this.goToThisPage("/");
    },
    startDirections: function() {
      if (this.searchPlace && this.myLocation) {
        eventBus.startDirections(
          this.myLocation.location,
          this.searchPlace.geometry.location
        );
        this.goToThisPage("/search");
      }
    },
    goToThisPage: function(path) {
      if (this.$route.path != path) {
        this.$router.push(path);
        this.$vuetify.breakpoint.xsOnly
          ? this.setRouterView(false)
          : this.setRouterView(true);
      }
    },
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  }
};
</script>
<style scoped>
::placeholder {
  color: white;
}
</style>

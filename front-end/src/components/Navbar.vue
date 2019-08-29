<template>
  <div>
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
      <v-toolbar-side-icon @click.stop="toggleDrawer" class="hidden-sm-and-down"></v-toolbar-side-icon>

      <v-toolbar-title
        class="hidden-sm-and-down"
        style="overflow: unset; margin-left: 10px"
      >Follroad</v-toolbar-title>

      <gmap-autocomplete
        @place_changed="setPlace"
        style="background-color: #0080FF; width:40%; height:70%"
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
      <v-spacer></v-spacer>
      <v-btn v-if="installBtn" icon @click="installer()">
        <v-icon>mobile_friendly</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" outline @click.prevent="login">Log in</v-btn>
      <!-- <v-btn v-else icon @click.prevent="logout">
        <v-icon>input</v-icon>
      </v-btn>-->
      <v-btn v-else icon to="/profile" @click="toggleRouterView('/profile')">
        <v-avatar size="35px">
          <img :src="profile.picture" alt="avatar" />
        </v-avatar>
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
        open: false,
        clipped: false,
        fixed: false,
        permanent: false,
        mini: true
      },
      toolbar: {
        fixed: true,
        clippedLeft: false
      },
      lists: [
        { text: "Feed", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Profile", icon: "person", route: "/profile" }
      ],
      activeRouter: "/",
      installBtn: false,
      installer: null,
      isAuthenticated: false,
      profile: this.$auth.profile
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
    searchPlace() {
      this.setupAutoComplete();
    }
  },
  methods: {
    ...mapActions([
      "setCenter",
      "setZoomLevel",
      "setSearchPlace",
      "setDirection",
      "setShowRouterView"
    ]),
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    },
    setupAutoComplete: function() {
      if (this.searchPlace) {
        this.$refs.autocomplete.$el.value = this.searchPlace.name;
        this.search();
      } else {
        this.$refs.autocomplete.$el.value = null;
      }
    },
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

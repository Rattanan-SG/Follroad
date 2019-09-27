<template>
  <div>
    <v-navigation-drawer
      app
      fixed
      :clipped="drawer.clipped"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
    >
      <v-list>
        <v-list-tile v-if="!drawer.permanent" @click="makeDrawerPermanent">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Static Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile
          v-for="list in lists"
          :key="list.text"
          :to="list.route"
          @click="setRouterView(true)"
        >
          <v-layout align-end fill-height>
            <v-list-tile-action>
              <v-icon>{{list.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{list.text}}</v-list-tile-title>
            </v-list-tile-content>
          </v-layout>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app flat fixed dark color="blue darken-3" :clipped-left="toolbar.clippedLeft">
      <v-toolbar-side-icon @click.stop="toggleDrawer" class="hidden-xs-only"></v-toolbar-side-icon>
      <!-- <v-toolbar-title v-if="!showSearchInput" style="overflow: unset; margin-left: 10px"> -->
      <img
        src="https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/Logo+%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%84%E0%B8%B3+2.png"
        v-if="!showSearchInput"
        height="70%"
        style="overflow: unset;"
      />
      <!-- </v-toolbar-title> -->

      <v-btn v-else icon @click="showSearchInput=false" class="ml-0">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <template v-if="showSearchInput || this.$vuetify.breakpoint.smAndUp">
        <gmap-autocomplete
          @place_changed="search"
          style="background-color: #0080FF; width:100%; height:70%"
          ref="gmapAutoComplete"
          placeholder="ค้นหาสถานที่"
          :class="this.$vuetify.breakpoint.smAndUp ? autoCompleteClass.normal : autoCompleteClass.mobile"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
        <v-btn v-if="searchPlace" icon @click="clearSearch">
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn v-if="searchPlace && !directionsResponse" icon @click="startDirections">
          <v-icon>directions</v-icon>
        </v-btn>
      </template>

      <v-spacer></v-spacer>

      <template v-if="!showSearchInput">
        <v-btn icon @click="showSearchInput=true" class="hidden-sm-and-up">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn v-if="installBtn" icon @click="installer()">
          <v-icon>mobile_friendly</v-icon>
        </v-btn>
        <v-btn v-if="!isAuthenticated" outline @click.prevent="login" :loading="loginLoading">Log in</v-btn>
        <v-btn v-if="isAuthenticated" icon to="/profile" @click="setRouterView(true)">
          <v-avatar size="36px">
            <img :src="profile.picture" alt="avatar" />
          </v-avatar>
        </v-btn>
      </template>
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
        permanent: false,
        mini: true
      },
      toolbar: {
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
      profile: this.$auth.profile,
      loginLoading: false,
      showSearchInput: false,
      autoCompleteClass: {
        normal: "ml-4 mr-2 pa-2 subheading",
        mobile: "mr-1 pa-2 subheading"
      }
    };
  },
  computed: {
    ...mapGetters("googleMap", ["myLocation"]),
    ...mapGetters("search", ["searchPlace"]),
    ...mapGetters("direction", ["directionsResponse"])
  },
  async created() {
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
        this.$refs.gmapAutoComplete.$el.value = newValue.name;
        if (oldValue) this.search(newValue);
      } else {
        this.$refs.gmapAutoComplete.$el.value = null;
      }
    }
  },
  methods: {
    ...mapActions("search", ["setSearchPlace"]),
    ...mapActions("direction", ["setDirectionsResponse"]),
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
      if (place) {
        this.setSearchPlace(place);
        this.goToThisPage("/search");
      }
    },
    clearSearch: function() {
      this.$refs.gmapAutoComplete.$el.value = null;
      this.setSearchPlace(null);
      eventBus.stopDirections();
      this.goToThisPage("/");
    },
    startDirections: function() {
      if (this.myLocation && this.searchPlace) {
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
      this.loginLoading = true;
      this.$auth.login();
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

<template>
  <div>
    <v-navigation-drawer
      app
      :fixed="drawer.fixed"
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
      <img
        src="https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/Logo+%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%84%E0%B8%B3+2.png"
        v-if="!showSearchInput || this.$vuetify.breakpoint.smAndUp"
        height="65%"
        alt="logo"
      />
      <v-btn v-else icon @click="showSearchInput=false" class="ml-0 hidden-sm-and-up">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <gmap-autocomplete
        v-show="showSearchInput || this.$vuetify.breakpoint.smAndUp"
        @place_changed="search"
        ref="gmapAutoComplete"
        placeholder="ค้นหาสถานที่"
        style="border-radius:15px; background-color: #0080FF; width:60%; height:60%"
        class="ml-2 py-2 px-3 subheading"
        :select-first-on-enter="true"
      ></gmap-autocomplete>
      <template v-if="showSearchInput">
        <v-btn v-if="searchPlace" icon @click="clearSearch">
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn v-if="searchPlace && !directionsResponse" icon @click="startDirections">
          <v-icon>directions</v-icon>
        </v-btn>
      </template>

      <v-spacer></v-spacer>

      <template v-if="!showSearchInput || this.$vuetify.breakpoint.smAndUp">
        <v-btn
          icon
          class="hidden-sm-and-up"
          id="searchbtn"
          aria-label="searchbtn"
          @click="showSearchInput=true"
        >
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn v-if="installBtn" icon id="installbtn" aria-label="installbtn" @click="installer()">
          <v-icon>system_update</v-icon>
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
        fixed: false,
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
      showSearchInput: false
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
        this.showSearchInput = true;
        this.$refs.gmapAutoComplete.$el.value = newValue.name;
        if (oldValue) this.search(newValue);
      } else {
        this.$refs.gmapAutoComplete.$el.value = null;
        this.showSearchInput = false;
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
      } else {
        this.setRouterView(true);
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

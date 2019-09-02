<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex v-if="showRouterView" xl3 lg3 md3 sm4 xs12 style="z-index: 2">
          <v-card flat height="100%">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </v-card>
        </v-flex>
        <v-flex>
          <GoogleMap />
        </v-flex>
      </v-layout>
      <RefreshSnackBar />
    </v-content>
    <BottomMenuBar />
  </v-app>
</template>

<script>
const Navbar = () => import("./components/Navbar/Navbar");
const BottomMenuBar = () => import("./components/Navbar/BottomMenuBar");
const GoogleMap = () => import("./components/GoogleMap/GoogleMap");
const RefreshSnackBar = () => import("./components/RefreshSnackBar.vue");
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    BottomMenuBar,
    GoogleMap,
    RefreshSnackBar
  },
  computed: {
    ...mapGetters(["showRouterView"])
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
    this.fetchEvents();
    this.$vuetify.breakpoint.xsOnly
      ? this.setShowRouterView(false)
      : this.setShowRouterView(true);
  },
  mounted() {
    this.getGeolocation();
  },
  methods: {
    ...mapActions([
      "setCenter",
      "setMyLocation",
      "fetchEvents",
      "setShowRouterView"
    ]),
    getGeolocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setUserLocation,
          this.handleLocationError,
          { enableHighAccuracy: true, timeout: 15000 }
        );
      }
    },
    setUserLocation: function(position) {
      let lat = parseFloat(position.coords.latitude);
      let lng = parseFloat(position.coords.longitude);
      this.setCenter({ lat: lat, lng: lng });
      this.setMyLocation({
        name: "ตำแหน่งของคุณ",
        location: { lat: lat, lng: lng }
      });
    },
    handleLocationError: function(error) {
      switch (error.code) {
        case 3:
          // deal with timeout
          navigator.geolocation.getCurrentPosition(
            this.setUserLocation,
            this.handleLocationError
          );
          break;
        case 2:
          // device can't get data
          break;
        case 1:
        // user said no
      }
    }
  }
};
</script>
<style scoped>
</style>
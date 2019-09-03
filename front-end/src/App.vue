<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex v-if="routerView" xl3 lg3 md3 sm4 xs12>
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
    <!-- <BottomMenuBar /> -->
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
    ...mapGetters("route", ["routerView"])
  },
  async created() {
    try {
      await this.$auth.renewTokens();
      this.fetchEvents();
      this.$vuetify.breakpoint.xsOnly
        ? this.setRouterView(false)
        : this.setRouterView(true);
    } catch (e) {
      console.error(e);
    }
  },
  mounted() {
    this.getGeolocation();
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("googleMap", ["setCenter", "setMyLocation"]),
    ...mapActions("event", ["fetchEvents"]),

    getGeolocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setUserLocation,
          this.handleLocationError,
          { enableHighAccuracy: true, timeout: 5000 }
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
  },
  destroyed() {}
};
</script>
<style scoped>
</style>
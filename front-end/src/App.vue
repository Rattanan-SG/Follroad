<template>
  <v-app>
    <Navbar/>
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
          <GoogleMap/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navbar from "./components/Navbar";
import GoogleMap from "./components/GoogleMap";
export default {
  name: "App",
  components: {
    Navbar,
    GoogleMap
  },
  computed: {
    ...mapGetters(["showRouterView"])
  },
  created() {
    this.fetchEvents();
  },
  mounted() {
    this.getGeolocateFromUser();
  },
  methods: {
    ...mapActions(["setCenter", "setMyLocation", "fetchEvents"]),
    getGeolocateFromUser: function() {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        this.setCenter({ lat: lat, lng: lng });
        this.setMyLocation({
          name: "ตำแหน่งของคุณ",
          location: { lat: lat, lng: lng }
        });
      });
    }
  }
};
</script>
<style scoped>
</style>
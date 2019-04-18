<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex v-if="this.$store.state.showRouterView" xl3 lg3 md3 sm4 xs12>
          <router-view></router-view>
        </v-flex>
        <v-flex>
          <GoogleMap/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "./components/Navbar";
import GoogleMap from "./components/GoogleMap";
export default {
  name: "App",
  components: {
    Navbar,
    GoogleMap
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
        this.setMyLocation({ lat: lat, lng: lng });
      });
    }
  }
};
</script>
<style scoped>
</style>
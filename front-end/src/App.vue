<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-layout row fill-height>
        <v-flex xl3 lg3 md3 class="hidden-sm-and-down">
          <router-view></router-view>
        </v-flex>
        <v-flex xl9 lg9 md9>
          <GoogleMap/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import GoogleMap from "./components/GoogleMap";
export default {
  name: "App",
  components: {
    Navbar,
    GoogleMap
  }
};
</script>
<style scoped>
</style>
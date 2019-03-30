<template>
  <v-app>
    <Navbar v-on:search="log"/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  methods: {
    log(event) {
      console.log(event);
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
.App {
  width: 100%;
  height: 100%;
}
.v-content,
.vue-map-container,
.vue-map {
  width: 100%;
  height: 100%;
}
</style>
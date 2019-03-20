<template>
  <div class="App">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
    };
  },
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
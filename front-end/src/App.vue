<template>
  <div class="App">
    <Navbar/>
    <div @click="installer()" :style="{'display' : installBtn}">install</div>
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
      installBtn: "none",
      installer: null
    };
  },
  created() {
    let installPrompt;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installer = () => {
      this.installBtn = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if (result.outcome === "accepted") {
          console.log("User accepted");
        } else {
          console.log("User denied");
        }
        installPrompt = null;
      });
    };
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
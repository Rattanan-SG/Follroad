<template>
  <div>
    <Navbar/>
    <router-view></router-view>
    <!-- <router-link to='/about'>about</router-link> -->
    <div @click="installer()" :style="{'display' : installBtn}">
      install
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      installBtn: "none",
      installer: null
    }
  },
  created() {
    let installPrompt;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block"
    })
    
    this.installer = () => {
      this.installBtn = "none"
      installPrompt.prompt()
      installPrompt.userChoice.then(result => {
        if(result.outcome === "accepted"){
          console.log("User accepted");
        }else{
          console.log("User denied");
        }
        installPrompt = null
      })
    }
  },
}
</script>

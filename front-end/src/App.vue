<template>
  <div>
    <Navbar/>  
    <router-view></router-view>
    <!-- <router-link to='/about'>about</router-link> -->
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
      //
    }
  }
}
</script>

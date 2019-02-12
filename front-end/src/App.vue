<template>
  <div>
    <Navbar/>
    <!-- <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="group pa-2">
        <v-icon>home</v-icon>
      </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        
      </v-btn>
    </v-toolbar> -->

    <!-- <v-content>
      <GoogleMap/>
    </v-content> -->
    
    <router-view></router-view>
    <router-link to='/about'></router-link>
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

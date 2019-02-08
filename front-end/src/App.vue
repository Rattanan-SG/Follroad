<template>
  <v-app>
    <v-toolbar app>
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
    </v-toolbar>

    <v-content>
      <GoogleMap/>
    </v-content>
  </v-app>
</template>

<script>
import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',
  components: {
    GoogleMap
  },
  data () {
    return {
      //
    }
  }
}
</script>

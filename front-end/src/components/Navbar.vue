 <!--<template>
    <v-toolbar app>
      <v-toolbar-title class="headline text">
        <span class="group pa-2">
        <v-icon margin- = "200px">menu</v-icon>
        
        <span>FollRoad </span>

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
</template> -->
<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">FollRoad</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>


<script>
export default {
 name: "Navbar"
}
</script>

<template>
  <div>
    <v-toolbar
      absolute
      color="blue-grey darken-2"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      height="40%"
      flat
    >
      <v-toolbar-title>สถานที่</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeInfoWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <br />
    <br />

    <v-card flat max-width="100%" class="mx-auto white--text" color="blue-grey darken-2">
      <v-img v-if="marker.photos" :src="marker.photos" max-width="100%" max-height="10%"></v-img>
      <v-card-text>
        <h3 class="headline mb-0">{{marker.title}}</h3>
        <div>{{marker.description}}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "InfoWindowSearchPlace",
  props: {
    marker: Object,
    closeInfoWindow: Function
  }
};
</script>

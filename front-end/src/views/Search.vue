<template>
  <v-tabs color="cyan" dark-side-color="yellow">
    <v-tab ripple>News</v-tab>
    <v-tab ripple>Search</v-tab>
  </v-tabs>
</template>
<script>
import GoogleMap from "../components/GoogleMap";
export default {
  components: {
    GoogleMap
  }
};
</script>
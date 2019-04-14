<template>
  <div style="height:100%">
    <v-layout row wrap style="height:100%">
      <v-flex xl3 lg3 md3 class="hidden-sm-and-down">
        <v-tabs color="cyan" dark-side-color="yellow">
          <v-tab ripple>News</v-tab>
          <v-tab ripple>Search</v-tab>
        </v-tabs>
      </v-flex>
      <v-flex xl9 lg9 md9>
        <GoogleMap/>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import GoogleMap from "../components/GoogleMap";

export default {
  components: {
    GoogleMap
  }
};
</script>
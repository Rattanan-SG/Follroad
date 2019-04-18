<template>
  <!-- <v-tabs color="cyan" dark-side-color="yellow"> -->
  <v-tabs>
    <v-tab-item>
      <SearchDirection/>
    </v-tab-item>
  </v-tabs>
  <!-- </v-tabs> -->
</template>
<script>
import SearchDirection from "../components/SearchDirection";
export default {
  components: {
    SearchDirection
  }
};
</script>
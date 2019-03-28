<template>
  <v-content>
      <SearchDirection/>
      <GoogleMap/>
  </v-content>
    
</template>
<script>
import SearchDirection from "../components/SearchDirection";
import GoogleMap from "../components/GoogleMap";

  export default {
      components: {
          SearchDirection,
          GoogleMap
      }
  };
</script>
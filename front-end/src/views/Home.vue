<template>
  <div class="home">
    <google-map/>
  </div>
</template>

<script>
import GoogleMap from "@/components/GoogleMap";

export default {
  name: 'home',
  components: {
    GoogleMap
  }
}
</script>

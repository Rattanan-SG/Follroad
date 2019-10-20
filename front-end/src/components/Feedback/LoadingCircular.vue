<template>
  <div v-if="loading" class="text-xs-center">
    <v-progress-circular :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "LoadingCircular",
  props: {
    loading: Boolean
  }
};
</script>

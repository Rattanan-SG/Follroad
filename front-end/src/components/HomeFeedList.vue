<template>
  <div>
    <template v-for="(event, index) in events">
      <HomeFeedItem :key="event.eid" :event="event"></HomeFeedItem>
      <v-divider v-if="index + 1 < event.length" :key="`divider-${index}`"></v-divider>
    </template>
  </div>
</template>

<script>
import HomeFeedItem from "./HomeFeedItem.vue";
export default {
  components: {
    HomeFeedItem
  },
  props: {
    events: Array
  }
};
</script>

<style scoped>
</style>
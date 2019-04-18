<template>
  <div>
    <FeedItem v-for="event in events" :key="event.eid" :event="event"></FeedItem>
  </div>
</template>

<script>
import FeedItem from "./FeedItem.vue";
export default {
  components: {
    FeedItem
  },
  props: {
    events: Array
  }
};
</script>
<style scoped>
</style>
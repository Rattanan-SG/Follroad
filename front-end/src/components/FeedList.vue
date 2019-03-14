<template>
  <div>
    <template v-for="event in events">
      <FeedItem :key="event.eid" :event="event"></FeedItem>
    </template>
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
<template>
  <div>
    <NewsFeedItem v-for="event in events" :key="event.eid" :event="event"></NewsFeedItem>
  </div>
</template>

<script>
import NewsFeedItem from "./NewsFeedItem.vue";
export default {
  components: {
    NewsFeedItem
  },
  props: {
    events: Array
  }
};
</script>
<style scoped>
</style>
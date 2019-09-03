<template>
  <div style="height: 60vh; overflow: auto">
    <NewsFeedItem v-for="event in events" :key="event.id" :event="event"></NewsFeedItem>
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
.v-list {
  height: 60vh;
  overflow: auto;
}
</style>
<template >
  <v-list two-line>
    <template v-for="(event, index) in events">
      <v-divider v-if="index + 1 < event.length" :key="`divider-${index}`"></v-divider>
      <HomeFeedItem :key="event.eid" :event="event"></HomeFeedItem>
    </template>
  </v-list>
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
.v-list {
  height: 300px;
  overflow-y: auto;
}
</style>
<template>
  <v-list class="pa-0">
    <template v-for="(event, index) in eventList">
      <NewsFeedItem :key="index" :event="event"></NewsFeedItem>
    </template>
    <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="getEvents"></infinite-loading>
  </v-list>
</template>

<script>
import event from "@/api/event";
import NewsFeedItem from "./NewsFeedItem.vue";
import InfiniteLoading from "vue-infinite-loading";
export default {
  components: {
    NewsFeedItem,
    InfiniteLoading
  },
  data() {
    return {
      eventList: [],
      limit: 10,
      startFrom: null,
      lastId: 0,
      infiniteId: new Date()
    };
  },
  methods: {
    getEvents: async function($state) {
      const events = await event.getEvents({
        limit: this.limit,
        startFrom: this.startFrom,
        lastId: this.lastId
      });
      if (events.length) {
        const lastEvent = events[events.length - 1];
        this.startFrom = lastEvent.start;
        this.lastId = lastEvent.id;
        this.eventList.push(...events);
        if ($state) $state.loaded();
      } else {
        if ($state) $state.complete();
      }
    }
  }
};
</script>
<style scoped>
.v-list {
  height: 75vh;
  overflow: auto;
}
</style>
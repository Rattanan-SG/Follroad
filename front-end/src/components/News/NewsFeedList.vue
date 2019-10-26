<template>
  <v-list class="pa-0">
    <template v-for="(event, index) in eventList">
      <NewsFeedItem
        :key="index"
        :initEvent="event"
        :isAuthenticated="isAuthenticated"
        :profile="profile"
      ></NewsFeedItem>
      <v-divider :key="'divider'+index"></v-divider>
    </template>

    <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="getEvents"></infinite-loading>
  </v-list>
</template>

<script>
import NewsFeedItem from "./NewsFeedItem.vue";
import InfiniteLoading from "vue-infinite-loading";
import eventApi from "@/api/event";
export default {
  components: {
    NewsFeedItem,
    InfiniteLoading
  },
  data() {
    return {
      isAuthenticated: false,
      profile: this.$auth.profile,
      eventList: [],
      limit: 10,
      startFrom: null,
      lastId: 0,
      infiniteId: new Date()
    };
  },
  created() {
    if (this.$auth.isAuthenticated()) {
      this.isAuthenticated = true;
      this.profile = this.$auth.profile;
    }
  },
  methods: {
    getEvents: async function($state) {
      const events = await eventApi.getEvents({
        limit: this.limit,
        startFrom: this.startFrom,
        lastId: this.lastId,
        countComment: true
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
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
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
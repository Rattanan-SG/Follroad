<template>
  <div style="height: 70vh; overflow: auto">
    <NewsFeedList :events="events"></NewsFeedList>
    <infinite-loading @infinite="getEvent"></infinite-loading>
  </div>
</template>

<script>
import axios from "axios";
const InfiniteLoading = () => import("vue-infinite-loading");
const NewsFeedList = () => import("../components/NewsFeedList");
export default {
  name: "News",
  components: {
    NewsFeedList,
    InfiniteLoading
  },
  data() {
    return {
      events: [],
      startAt: "now"
    };
  },
  methods: {
    getEvent: function($state) {
      axios
        .get(`${process.env.VUE_APP_NOTIFICATION_URL}/event`, {
          params: {
            startAt: this.startAt,
            limit: 10
          }
        })
        .then(({ data }) => {
          if (data.length) {
            this.startAt = data[data.length - 1].start;
            this.events.push(...data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  }
};
</script>
    
<style>
</style>

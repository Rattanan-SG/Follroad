<template>
  <div style="height: 580px; overflow: auto">
    <NewsFeedList :events="events"></NewsFeedList>
    <infinite-loading @infinite="getEvent"></infinite-loading>
  </div>
</template>

<script>
import NewsFeedList from "../components/NewsFeedList";
import axios from "@/utilitys/axios";
export default {
  name: "News",
  components: {
    NewsFeedList
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
        .get("/events", {
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

<template>
  <div>
    <FeedList :events="events"></FeedList>
    <infinite-loading @infinite="getEvent"></infinite-loading>
  </div>
</template>

<script>
import FeedList from "../components/FeedList";
import axios from "axios";

export default {
  components: {
    FeedList
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
        .get("http://localhost:4000/events", {
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

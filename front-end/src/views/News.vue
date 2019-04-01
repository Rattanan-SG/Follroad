<template>
  <FeedList :events="events"></FeedList>
</template>



<script>
import FeedList from "../components/FeedList";
import axios from "@/utilitys/axios";

export default {
  components: {
    FeedList
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    getEvent: function() {
      axios
        .get("/events")
        .then(response => {
          this.events = response.data;
          console.log("====================================");
          console.log(this.events[0]);
          console.log("====================================");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
    
<style>
</style>

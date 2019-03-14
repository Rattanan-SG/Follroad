<template>
  <div>
    <FeedList :events="events"></FeedList>
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
      events: []
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    getEvent: function() {
      axios
        .get("http://localhost:3000/event")
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

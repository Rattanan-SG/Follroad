<template>
  <v-tabs color="cyan" dark-side-color="yellow" >
    <v-tab ripple>News</v-tab>
    <v-tab ripple>Search</v-tab>
    <v-tab-item>
      <HomeFeedList :events="events"></HomeFeedList>
    </v-tab-item>
    <v-tab-item>
      <SearchDirection/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import GoogleMap from "../components/GoogleMap";
import HomeFeedList from "../components/HomeFeedList";
import SearchDirection from "../components/SearchDirection";
import axios from "@/utilitys/axios";

export default {
  components: {
    GoogleMap,
    HomeFeedList,
    SearchDirection
  },
  data() {
    return {
      events: [],
      offsetTop: 0
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    getEvent: async function() {
      axios
        .get("/events")
        .then(response => {
          this.events = response.data;
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


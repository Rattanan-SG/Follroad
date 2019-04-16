<template>
  <div style="height:100%">
    <v-layout row wrap style="height:100%">
      <v-flex xl3 lg3 md3 class="hidden-sm-and-down">
        <v-tabs color="cyan" dark-side-color="yellow">
          <v-tab ripple>News</v-tab>
          <v-tab ripple>Search</v-tab>
          <v-tab ripple>
            <ScrollableDialog/>
          </v-tab>
          <v-tab-item>
            <HomeFeedList :events="events"></HomeFeedList>
          </v-tab-item>
          <v-tab-item>
            <SearchDirection/>
          </v-tab-item>
        </v-tabs>
      </v-flex>
      <v-flex xl9 lg9 md9>
        <GoogleMap/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GoogleMap from "../components/GoogleMap";
import HomeFeedList from "../components/HomeFeedList";
import SearchDirection from "../components/SearchDirection";
import ScrollableDialog from "../components/ScrollableDialog";
import axios from "@/utilitys/axios";

export default {
  components: {
    GoogleMap,
    HomeFeedList,
    SearchDirection,
    ScrollableDialog
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


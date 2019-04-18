<template>
  <v-tabs>
    <ScrollableDialog/>
    <v-tab-item>
      <HomeFeedList :events="events"></HomeFeedList>
    </v-tab-item>
  </v-tabs>
</template> 

<script>
import HomeFeedList from "../components/HomeFeedList";
import ScrollableDialog from "../components/ScrollableDialog";
import axios from "@/utilitys/axios";
export default {
  components: {
    HomeFeedList,
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

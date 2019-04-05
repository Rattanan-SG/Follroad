<template>
  <div style="height:100%">
    <v-layout row wrap style="height:100%">
      <v-flex lg3 class="scroll-y hidden-sm-and-down">
        <v-container id="scroll-target" style="max-height: 100px">
          <HomeFeedList :events="events"></HomeFeedList>
        </v-container>
      </v-flex>
      <v-flex lg9>
        <GoogleMap/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GoogleMap from "../components/GoogleMap";
import HomeFeedList from "../components/HomeFeedList";
import axios from "@/utilitys/axios";

export default {
  components: {
    GoogleMap,
    HomeFeedList
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
    getEvent: function() {
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
<style >
</style>


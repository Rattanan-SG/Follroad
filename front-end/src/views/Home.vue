<template>
  <div>
    <v-card>
      <v-layout row wrap>
        <v-flex lg3>
            <v-container
              id="scroll-target"
              style="max-height: 580px"
              class="scroll-y"
            >       
                <HomeFeedList :events="events"></HomeFeedList>
            </v-container>
        </v-flex>
        <v-flex lg9>
          <GoogleMap/>
        </v-flex>
      </v-layout>
    </v-card>
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
<style >
</style>


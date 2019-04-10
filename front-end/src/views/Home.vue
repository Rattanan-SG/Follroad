<template>
  <div>
    <div>
      <v-layout row wrap style="height:100%">
        <v-flex lg3 class="scroll-y hidden-sm-and-down">
          <v-card lg3 height="590px">
            <v-tabs v-model="active" color="cyan" dark-side-color="yellow">
              <v-tab ripple>News</v-tab>
              <v-tab ripple>Search</v-tab>
              <v-tab-item>
                <v-card flat>
                  <HomeFeedList :events="events"></HomeFeedList>
                </v-card>
                <!-- <v-card></v-card> -->
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <SearchDirection/>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
        <v-flex lg9>
          <v-card width="100%" height="590px">
            <GoogleMap/>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <!-- <v-layout row wrap style="height:100%">
      <v-flex lg3 class="scroll-y hidden-sm-and-down">
        <v-container id="scroll-target" style="max-height: 100px">
          <HomeMenuTab></HomeMenuTab>
          <HomeFeedList :events="events"></HomeFeedList>
        </v-container>
      </v-flex>
      <v-flex lg9>
        <GoogleMap/>
      </v-flex>
    </v-layout>-->
  </div>
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
<style>
</style>


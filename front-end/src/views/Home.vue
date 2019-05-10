<template>
  <div>
    <v-layout>
      <v-flex xs12 mx-2>
        <HomeSearchEvent/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs mx-2>
        <HomeShowSpecificEvent/>
      </v-flex>
      <v-flex xs>
        <HomeFilterEventCategory/>
      </v-flex>
    </v-layout>
    <HomeFeedList/>
  </div>
</template> 

<script>
const HomeFeedList = () => import("../components/HomeFeedList");
const HomeFilterEventCategory = () =>
  import("../components/HomeFilterEventCategory");
const HomeSearchEvent = () => import("../components/HomeSearchEvent");
const HomeShowSpecificEvent = () =>
  import("../components/HomeShowSpecificEvent");
export default {
  name: "Home",
  components: {
    HomeFeedList,
    HomeFilterEventCategory,
    HomeSearchEvent,
    HomeShowSpecificEvent
  }
};
</script>

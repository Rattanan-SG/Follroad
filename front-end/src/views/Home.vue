<template>
  <div>
    <v-layout>
      <v-flex xs10 lg10 md10 ml-2>
        <HomeSearchEvent/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 lg8 md7 xl7 ml-1>
        <HomeShowSpecificEvent/>
      </v-flex>
      <v-flex xs2 lg5 md2 xl2>
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

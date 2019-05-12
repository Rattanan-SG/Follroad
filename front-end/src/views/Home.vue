<template>
  <div>
    <v-layout>
      <v-flex xs12 mx-2>
        <HomeSearchEvent/>
      </v-flex>
    </v-layout>
    <v-layout justify-center mb-2>
      <HomeFilterEventCategory/>
    </v-layout>
    <HomeFeedList/>
  </div>
</template> 

<script>
const HomeFeedList = () => import("../components/HomeFeedList");
const HomeFilterEventCategory = () =>
  import("../components/HomeFilterEventCategory");
const HomeSearchEvent = () => import("../components/HomeSearchEvent");
export default {
  name: "Home",
  components: {
    HomeFeedList,
    HomeFilterEventCategory,
    HomeSearchEvent
  }
};
</script>

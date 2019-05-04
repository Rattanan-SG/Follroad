<template>
  <div>
    <v-layout>
      <v-flex>
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
    <HomeFeedList></HomeFeedList>
  </div>
</template> 

<script>
import HomeFeedList from "../components/HomeFeedList";
import HomeFilterEventCategory from "../components/HomeFilterEventCategory";
import HomeSearchEvent from "../components/HomeSearchEvent";
import HomeShowSpecificEvent from "../components/HomeShowSpecificEvent";
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
<style>
</style>

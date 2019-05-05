<template>
  <div>
    <v-layout>
      <v-flex>
        <SearchEvent/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 lg8 md7 xl7 ml-1>
        <ShowSpecificEvent/>
      </v-flex>
      <v-flex xs2 lg5 md2 xl2>
        <FilterEventCategory/>
      </v-flex>
    </v-layout>
    <HomeFeedList></HomeFeedList>
  </div>
</template> 

<script>
const HomeFeedList = () => import("../components/HomeFeedList");
const FilterEventCategory = () => import("../components/FilterEventCategory");
const SearchEvent = () => import("../components/SearchEvent");
const ShowSpecificEvent = () => import("../components/ShowSpecificEvent");
export default {
  name: "Home",
  components: {
    HomeFeedList,
    FilterEventCategory,
    SearchEvent,
    ShowSpecificEvent
  }
};
</script>
<style>
</style>

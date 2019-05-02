<template>
  <div>
    <SearchEvent/>
    <FilterEventCategory/>
    <HomeFeedList></HomeFeedList>
  </div>
</template> 

<script>
import HomeFeedList from "../components/HomeFeedList";
import FilterEventCategory from "../components/FilterEventCategory";
import SearchEvent from "../components/SearchEvent";
export default {
  name: "Home",
  components: {
    HomeFeedList,
    FilterEventCategory,
    SearchEvent
  }
};
</script>
<style>
</style>

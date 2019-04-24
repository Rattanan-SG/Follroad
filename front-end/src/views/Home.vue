<template>
  <div>
    <FilterEventCategory/>
    <HomeFeedList></HomeFeedList>
  </div>
</template> 

<script>
import HomeFeedList from "../components/HomeFeedList";
import FilterEventCategory from "../components/FilterEventCategory";
export default {
  name: "Home",
  components: {
    HomeFeedList,
    FilterEventCategory
  }
};
</script>
<style>
</style>

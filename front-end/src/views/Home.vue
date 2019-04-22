<template>
  <div>
    <ScrollableDialog/>
    <HomeFeedList></HomeFeedList>
  </div>
</template> 

<script>
import HomeFeedList from "../components/HomeFeedList";
import ScrollableDialog from "../components/ScrollableDialog";
export default {
  name: "Home",
  components: {
    HomeFeedList,
    ScrollableDialog
  }
};
</script>
<style>
</style>

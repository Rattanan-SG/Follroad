<template>
  <v-tabs>
    <ScrollableDialog/>
    <v-tab-item>
      <HomeFeedList></HomeFeedList>
    </v-tab-item>
  </v-tabs>
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

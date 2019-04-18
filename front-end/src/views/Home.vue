<template>
  <v-tabs color="cyan" dark-side-color="yellow">
    <v-tab ripple>News</v-tab>
    <v-tab ripple>Search</v-tab>
    <v-tab ripple>
      <ScrollableDialog/>
    </v-tab>
    <v-tab-item>
      <HomeFeedList></HomeFeedList>
    </v-tab-item>
    <v-tab-item>
      <SearchDirection/>
    </v-tab-item>
  </v-tabs>
</template> 

<script>
import HomeFeedList from "../components/HomeFeedList";
import SearchDirection from "../components/SearchDirection";
import ScrollableDialog from "../components/ScrollableDialog";
export default {
  name: "Home",
  components: {
    HomeFeedList,
    SearchDirection,
    ScrollableDialog
  }
};
</script>
<style>
</style>

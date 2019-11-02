<template>
  <div>
    <CloseViewToolBar title="เหตุการณ์" />
    <v-layout row wrap py-2>
      <v-flex grow px-2>
        <HomeFilterEventCategory />
      </v-flex>
      <v-flex shrink px-2>
        <HomeRefreshButton />
      </v-flex>
    </v-layout>
    <HomeFeedList />
  </div>
</template> 

<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const HomeFeedList = () => import("@/components/Home/HomeFeedList");
const HomeFilterEventCategory = () =>
  import("@/components/Home/HomeFilterEventCategory");
const HomeRefreshButton = () => import("@/components/Home/HomeRefreshButton");
export default {
  name: "Home",
  components: {
    CloseViewToolBar,
    HomeFeedList,
    HomeFilterEventCategory,
    HomeRefreshButton
  }
};
</script>

<template>
  <div>
    <v-card color="blue darken-3" flat>
      <CloseViewToolBar title="เหตุการณ์" />
    </v-card>
    <v-layout justify-center mb-2>
      <HomeFilterEventCategory />
    </v-layout>
    <HomeFeedList />
  </div>
</template> 

<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const HomeFeedList = () => import("@/components/Home/HomeFeedList");
const HomeFilterEventCategory = () =>
  import("@/components/Home/HomeFilterEventCategory");
// const HomeSearchEvent = () => import("@/components/Home/HomeSearchEvent");
export default {
  name: "Home",
  components: {
    CloseViewToolBar,
    HomeFeedList,
    HomeFilterEventCategory
    // HomeSearchEvent
  }
};
</script>

<template>
  <div>
    <v-card color="blue darken-3" flat>
      <CloseViewToolBar title="ข่าว" />
    </v-card>
    <NewsFeedList />
  </div>
</template>

<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const NewsFeedList = () => import("@/components/News/NewsFeedList");
export default {
  name: "News",
  components: {
    CloseViewToolBar,
    NewsFeedList
  }
};
</script>

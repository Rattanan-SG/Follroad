<template>
  <div>
    <CloseViewToolBar title="ข่าว" />
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

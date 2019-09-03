<template>
  <div>
    <BackToolBar title="ข่าว" />
    <NewsFeedList :events="events"></NewsFeedList>
    <infinite-loading @infinite="getEvents"></infinite-loading>
  </div>
</template>

<script>
const InfiniteLoading = () => import("vue-infinite-loading");
const BackToolBar = () => import("@/components/Navbar/BackToolBar");
const NewsFeedList = () => import("@/components/News/NewsFeedList");
import event from "@/api/event";

export default {
  name: "News",
  components: {
    BackToolBar,
    NewsFeedList,
    InfiniteLoading
  },
  data() {
    return {
      events: [],
      startFrom: null
    };
  },
  methods: {
    getEvents: function($state) {
      event
        .getEvents({
          startFrom: this.startFrom,
          limit: 10
        })
        .then(data => {
          if (data.length) {
            this.startFrom = data[data.length - 1].start;
            this.events.push(...data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  }
};
</script>
    
<style>
</style>

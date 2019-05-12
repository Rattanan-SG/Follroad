<template>
  <v-list two-line>
    <template v-for="(event, index) in eventList">
      <v-divider v-if="index + 1 < event.length" :key="`divider-${index}`"></v-divider>
      <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
    </template>
    <infinite-loading :identifier="infiniteId" @infinite="getEvents"></infinite-loading>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import HomeFeedItem from "./HomeFeedItem.vue";
const InfiniteLoading = () => import("vue-infinite-loading");
export default {
  components: {
    HomeFeedItem,
    InfiniteLoading
  },
  data() {
    return {
      eventList: [],
      pageSize: 10,
      pageNumber: 0,
      infiniteId: new Date()
    };
  },
  computed: {
    ...mapGetters(["events", "pagingEvents"])
  },
  watch: {
    events() {
      this.pageNumber = 0;
      this.infiniteId += 1;
      this.eventList = [];
    }
  },
  methods: {
    getEvents: function($state) {
      let events = this.pagingEvents(this.pageSize, this.pageNumber);
      if (events.length) {
        this.pageNumber++;
        this.eventList.push(...events);
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>
<style scoped>
.v-list {
  height: 500px;
  overflow: auto;
}
</style>
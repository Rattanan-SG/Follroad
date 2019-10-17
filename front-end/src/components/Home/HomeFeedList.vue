<template>
  <v-list two-line>
    <template v-for="(event, index) in eventList">
      <v-subheader v-if="index == 0" :key="`header-${index}`" inset>เหตุการณ์ปัจจุบัน</v-subheader>
      <v-divider v-if="index == 0" :key="`divider-${index}`" inset></v-divider>
      <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
    </template>
    <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="getEvents"></infinite-loading>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import HomeFeedItem from "./HomeFeedItem";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "HomeFeedList",
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
    ...mapGetters("event", ["events", "pagingEvents"])
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
  height: 60vh;
  overflow: auto;
}
</style>
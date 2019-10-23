<template>
  <div class="border">
    <v-list two-line v-if="specificEvents.length > 0">
      <template v-for="(event, index) in specificEvents">
        <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
      </template>
    </v-list>
    <div
      v-else
      class="subheading py-3 text-xs-center indigo--text text--darken-4"
    >ไม่มีเหตุการณ์ที่เกี่ยวข้องกับเส้นทางนี้</div>
  </div>
</template>

<script>
import HomeFeedItem from "../Home/HomeFeedItem";
import { mapGetters } from "vuex";
export default {
  name: "SearchFeedPanel",
  components: {
    HomeFeedItem
  },
  computed: {
    ...mapGetters("direction", ["specificEvents"])
  }
};
</script>
<style scoped>
.border {
  border: 1px solid #cdcdcd;
}
</style>

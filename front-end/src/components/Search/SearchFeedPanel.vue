<template>
  <div>
    <!-- <v-expansion-panel v-if="specificEvents"> -->
    <!-- <v-expansion-panel-content> -->
    <!-- <template v-slot:header>
        <div>จำนวนเหตุการณ์ที่เกี่ยวข้องกับเส้นทางนี้ ({{specificEvents.length}})</div>
    </template>-->
    <v-card v-if="specificEvents">
      <v-card-text>จำนวนเหตุการณ์ที่เกี่ยวข้องกับเส้นทางนี้ ({{specificEvents.length}})</v-card-text>
      <v-list two-line>
        <template v-for="(event, index) in specificEvents">
          <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
        </template>
      </v-list>
    </v-card>
    <!-- </v-expansion-panel-content> -->
    <!-- </v-expansion-panel> -->
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
.v-list {
  overflow: auto;
  max-height: 15vh;
}
</style>

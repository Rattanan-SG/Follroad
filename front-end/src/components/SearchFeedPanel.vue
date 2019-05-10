<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <template v-slot:header>
        <div>จำนวนเหตุการณ์ที่เกี่ยวข้องกับเส้นทางนี้ ({{specificEvents.length}})</div>
      </template>
      <v-list two-line>
        <template v-for="(event, index) in specificEvents">
          <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
        </template>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import HomeFeedItem from "./HomeFeedItem";
import { mapGetters } from "vuex";
export default {
  name: "SearchFeedPanel",
  components: {
    HomeFeedItem
  },
  computed: {
    ...mapGetters(["specificEvents"])
  }
};
</script>

<style>
</style>

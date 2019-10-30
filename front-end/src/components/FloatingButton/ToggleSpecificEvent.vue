<template >
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <template v-slot:activator="{ on }">
      <v-flex xs12 lg12 md12 class="hidden-sm-and-up ToggleSpecificEvent">
        <v-btn round color="blue" dark @click.stop="dialog = true">เหตุการณ์ที่เกี่ยวข้อง</v-btn>
      </v-flex>
    </template>
    <v-card>
      <v-toolbar color="blue" dark flat>
        <v-icon>event</v-icon>
        <v-toolbar-title>เหตุการณ์ที่เกี่ยวข้องกับเส้นทาง</v-toolbar-title>
      </v-toolbar>
      <div v-if="!!specificEvents.length" class="px-2">
        <v-list two-line>
          <template v-for="(event, index) in specificEvents">
            <HomeFeedItem :key="index" :event="event" @toggle-info-window="dialog = false"></HomeFeedItem>
          </template>
        </v-list>
      </div>
      <div v-else class="pa-4">
        <span>ไม่มีเหตุการณ์ที่เกี่ยวข้องกับเส้นทางนี้</span>
      </div>
      <v-divider />
      <v-card-actions>
        <v-layout row justify-end>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="dialog = false">ปิด</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import HomeFeedItem from "@/components/Home/HomeFeedItem";
export default {
  name: "ToggleSpecificEvent",
  components: {
    HomeFeedItem
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters("direction", ["specificEvents"])
  }
};
</script>
<style scoped>
.ToggleSpecificEvent {
  bottom: 7%;
  right: 56%;
  position: absolute;
  z-index: 1;
}
.v-list {
  height: 40vh;
  overflow: auto;
}
</style>
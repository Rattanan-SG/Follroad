<template>
  <v-layout row justify-center class="hidden-sm-and-up">
    <v-flex xs12 lg12 md12 class="ToggleSpecificEvent">
      <v-btn round color="blue" dark @click.stop="dialog = true">เหตุการณ์ที่เกี่ยวข้อง</v-btn>
    </v-flex>
    <v-dialog v-model="dialog" hide-overlay max-width="400">
      <v-card>
        <v-toolbar color="blue" dark flat>
          <v-icon>event</v-icon>
          <v-toolbar-title>เหตุการณ์ที่เกี่ยวข้องกับเส้นทาง</v-toolbar-title>
        </v-toolbar>
        <div v-if="!!specificEvents.length" class="px-2">
          <v-list two-line>
            <template v-for="(event, index) in specificEvents">
              <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
            </template>
          </v-list>
        </div>
        <div v-else class="pa-4">
          <span>ไม่มีเหตุการณ์ที่เกี่ยวข้องกับเส้นทางนี้</span>
        </div>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
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
</style>
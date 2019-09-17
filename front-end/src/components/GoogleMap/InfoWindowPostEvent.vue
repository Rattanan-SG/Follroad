<template>
  <div>
    <v-toolbar
      absolute
      flat
      dark
      scroll-off-screen
      color="blue-grey darken-2"
      scroll-target="#scrolling-techniques"
      height="35%"
    >
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeInfoWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card flat max-width="400px" class="mx-auto pt-4">
      <v-card-title class="px-0">
        <div>
          <v-icon medium>post_add</v-icon>
          <span class="headline">แจ้งเหตุการณ์</span>
          <div
            class="pt-1 subheading grey--text text--darken-1"
          >คุณต้องการที่จะแจ้งเหตุการณ์ที่ตำแหน่งนี้หรือไม่?</div>
        </div>
      </v-card-title>
      <v-card-text class="px-0 pt-1">{{marker.title}}</v-card-text>
      <v-card-actions class="px-0 pt-0">
        <v-spacer></v-spacer>
        <v-btn outline color="red white--text" @click="cancel" class="mx-2">ยกเลิก</v-btn>
        <PostEventDialog
          :marker="marker"
          :closeInfoWindow="closeInfoWindow"
          :completePostEvent="completePostEvent"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostEventDialog from "./PostEventDialog";
export default {
  name: "InfoWindowPostEvent",
  components: {
    PostEventDialog
  },
  props: {
    marker: Object,
    closeInfoWindow: Function
  },
  methods: {
    ...mapActions("postEvent", ["completePostEvent"]),
    cancel: function() {
      this.completePostEvent();
      this.closeInfoWindow();
    }
  }
};
</script>
<style>
</style>

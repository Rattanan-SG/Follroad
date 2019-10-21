<template>
  <div>
    <v-toolbar
      absolute
      flat
      dark
      scroll-off-screen
      color="blue darken-3"
      scroll-target="#scrolling-techniques"
      height="35%"
    >
      <v-toolbar-title>แจ้งเหตุการณ์</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeInfoWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card flat max-width="400px" class="mx-auto pt-4">
      <v-card-title class="px-1">
        <div>
          <!-- <v-icon medium>post_add</v-icon>
          <span class="headline">แจ้งเหตุการณ์</span>-->
          <div
            class="pt-1 subheading grey--text text--darken-1"
          >คุณต้องการที่จะแจ้งเหตุการณ์ที่ตำแหน่งนี้หรือไม่?</div>
        </div>
      </v-card-title>
      <v-card-text class="px-1 pt-1 body-2">{{marker.title}}</v-card-text>
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

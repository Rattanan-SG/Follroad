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

    <v-card flat max-width="100%" class="mx-auto pt-4">
      <v-card-title class="pb-1 px-0">
        <div class="title">
          <v-icon>post_add</v-icon>แจ้งเหตุการณ์
        </div>
      </v-card-title>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="red white--text" @click="cancel">ยกเลิก</v-btn>
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

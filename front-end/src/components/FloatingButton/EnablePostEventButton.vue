<template>
  <div>
    <v-btn
      dark
      fab
      small
      class="enablePostEventButton"
      :color="activePostEvent ? 'red' : 'green'"
      @click="toggleActivePostEvent"
    >
      <v-icon>add_comment</v-icon>
    </v-btn>
    <v-snackbar v-model="activePostEvent" top color="error" :timeout="0">
      <v-icon color="white" medium left>touch_app</v-icon>กดบนแผนที่เพื่อแจ้งเหตุการณ์
      <v-btn dark flat @click="toggleActivePostEvent">ปิด</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EnablePostEventButton",
  computed: {
    ...mapGetters("postEvent", ["activePostEvent"])
  },
  methods: {
    ...mapActions("postEvent", ["setActivePostEvent"]),
    toggleActivePostEvent: function() {
      this.snackbar = !this.snackbar;
      this.setActivePostEvent(!this.activePostEvent);
    }
  }
};
</script>
<style scoped>
.enablePostEventButton {
  bottom: 15%;
  right: 0%;
  position: absolute;
  z-index: 1;
}
.v-snack--top {
  top: 1%;
}
</style>
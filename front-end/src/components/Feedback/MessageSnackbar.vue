<template>
  <v-snackbar
    v-model="messageSnackbar"
    top
    right
    multi-line
    :timeout="messageSnackbarOption.timeout"
    :color="messageSnackbarOption.color"
  >
    {{ messageSnackbarOption.text }}
    <v-btn dark flat @click="snackbar = false">ปิด</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MessageSnackbar",
  computed: {
    messageSnackbar: {
      get() {
        return this.$store.state.globalFeedback.messageSnackbar;
      },
      set(value) {
        this.$store.commit("globalFeedback/SET_MESSAGE_SNACKBAR", value);
      }
    },
    ...mapGetters("globalFeedback", ["messageSnackbarOption"])
  }
};
</script>
<style scoped>
/* .v-snack--top {
  top: 8%;
} */
</style>

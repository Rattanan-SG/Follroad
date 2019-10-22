<template>
  <v-btn flat icon dark color="primary" @click.stop="refreshEventAndFeedback">
    <v-icon large>refresh</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HomeRefreshButton",
  methods: {
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("feedback", ["fetchFeedbackSummary"]),
    refreshEventAndFeedback: async function() {
      await this.fetchEvents();
      if (this.$auth.isAuthenticated()) {
        const { sub: uid } = this.$auth.profile;
        await this.fetchFeedbackSummary(uid);
      } else {
        await this.fetchFeedbackSummary();
      }
    }
  }
};
</script>
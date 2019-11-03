<template>
  <div>
    <v-btn
      flat
      icon
      :color="feedback.react === 1 ? 'blue lighten-2' : 'grey '"
      @click="handleClick(1)"
    >
      <v-icon>thumb_up</v-icon>
    </v-btn>
    <span class="subheading mr-2">{{feedback.like}}</span>
    <v-btn
      flat
      icon
      :color="feedback.react === 0 ? 'red lighten-2' : 'grey '"
      @click="handleClick(0)"
    >
      <v-icon>thumb_down</v-icon>
    </v-btn>
    <span class="subheading mr-2">{{feedback.dislike}}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
export default {
  name: "LikeDislikeControl",
  props: {
    eventId: Number
  },
  data() {
    return {
      countLike: 0,
      countDislike: 0,
      active: null
    };
  },
  computed: {
    feedback() {
      return this.$store.getters["feedback/feedbackByEventId"](this.eventId);
    }
  },
  methods: {
    ...mapActions("globalFeedback", ["setLoginDialog"]),
    ...mapActions("feedback", ["updateFeedbackByEventId"]),

    handleClick: function(value) {
      const { like = 0, dislike = 0, react = null } = this.feedback;
      this.countLike = like;
      this.countDislike = dislike;
      this.active = react;
      if (!this.$auth.isAuthenticated) {
        this.setLoginDialog(true);
      } else if (this.active === null) {
        value ? this.countLike++ : this.countDislike++;
        this.updateFeedbacks(value);
      } else if (this.active !== value) {
        this.active ? this.countLike-- : this.countDislike--;
        value ? this.countLike++ : this.countDislike++;
        this.updateFeedbacks(value);
      } else if (this.active === value) {
        this.active ? this.countLike-- : this.countDislike--;
        this.deleteFeedbacks();
      }
    },
    updateFeedbacks: async function(value) {
      const feedback = {
        eventId: this.eventId,
        react: value,
        like: this.countLike,
        dislike: this.countDislike
      };
      this.updateFeedbackByEventId({ eventId: this.eventId, data: feedback });
      await eventApi.putFeedback({
        eventId: this.eventId,
        react: value
      });
    },
    deleteFeedbacks: async function() {
      const feedback = {
        eventId: this.eventId,
        react: null,
        like: this.countLike,
        dislike: this.countDislike
      };
      this.updateFeedbackByEventId({ eventId: this.eventId, data: feedback });
      await eventApi.deleteFeedback({
        data: { eventId: this.eventId }
      });
    }
  }
};
</script>

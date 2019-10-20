<template>
  <div>
    <v-btn flat icon :color="active === 1 ? 'blue lighten-2' : 'grey '" @click="handleClick(1)">
      <v-icon>thumb_up</v-icon>
    </v-btn>
    <span class="subheading mr-3">{{countLike}}</span>
    <v-btn flat icon :color="active === 0 ? 'red lighten-2' : 'grey '" @click="handleClick(0)">
      <v-icon>thumb_down</v-icon>
    </v-btn>
    <span class="subheading mr-3">{{countDislike}}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
export default {
  name: "LikeDislikeControl",
  props: {
    eventId: Number,
    initialLike: {
      type: Number,
      default: 0
    },
    initialDislike: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: null,
      countLike: this.initialLike,
      countDislike: this.initialDislike
    };
  },
  methods: {
    ...mapActions("globalFeedback", ["setLoginDialog"]),
    ...mapActions("event", ["updateEventById"]),

    handleClick: async function(value) {
      if (!this.$auth.isAuthenticated()) {
        this.setLoginDialog(true);
      } else if (this.active === null) {
        value ? this.countLike++ : this.countDislike++;
        this.active = value;
        this.updateFeedbacks(value);
      } else if (this.active !== value) {
        this.active ? this.countLike-- : this.countDislike--;
        value ? this.countLike++ : this.countDislike++;
        this.active = value;
        this.updateFeedbacks(value);
      } else if (this.active === value) {
        this.active ? this.countLike-- : this.countDislike--;
        this.active = null;
        this.deleteFeedbacks();
      }
    },
    updateFeedbacks: async function(value) {
      const feedbacks = [
        {
          like: this.countLike,
          dislike: this.countDislike
        }
      ];
      this.updateEventById({ id: this.eventId, data: { feedbacks } });
      await eventApi.putFeedback({
        eventId: this.eventId,
        react: value
      });
    },
    deleteFeedbacks: async function() {
      const feedbacks = [
        {
          like: this.countLike,
          dislike: this.countDislike
        }
      ];
      this.updateEventById({ id: this.eventId, data: { feedbacks } });
      await eventApi.deleteFeedback({
        data: { eventId: this.eventId }
      });
    }
  }
};
</script>

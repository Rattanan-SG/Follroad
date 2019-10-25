<template>
  <v-layout row wrap pt-2 align-center justify-space-between>
    <v-flex xs1 pl-2 pt-1>
      <v-avatar size="25px" v-if="isAuthenticated">
        <img :src="profile.picture" alt="avatar" />
      </v-avatar>
      <v-icon v-else color="primary" medium>person</v-icon>
    </v-flex>
    <v-flex xs11 pl-3>
      <v-textarea
        v-model="comment"
        label="แสดงความคิดเห็น"
        rows="2"
        clearable
        append-outer-icon="send"
        @click:append-outer="sendMessage"
      ></v-textarea>
    </v-flex>

    <v-layout>
      <v-flex lg1 mt-4 ml-2>
        <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px" />
      </v-flex>
      <v-flex xs11 md11 lg11>
        <v-card-text>
          <div>
            <h3 class="blue--text">{{author}}</h3>
            <div>{{commentDetail}}</div>
            <div class="red--text">{{postTime}}</div>
          </div>
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-flex>
      <v-divider></v-divider>
    </v-flex>
    <v-layout>
      <v-flex lg1 mt-4 ml-2>
        <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px" />
      </v-flex>
      <v-flex xs11 md11 lg11>
        <v-card-text>
          <div>
            <h3 class="blue--text">{{author}}</h3>
            <div>{{commentDetail}}</div>
            <div class="red--text">{{postTime}}</div>
          </div>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
export default {
  name: "CommentControl",
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
      const { like, dislike, react } = this.feedback;
      this.countLike = like;
      this.countDislike = dislike;
      this.active = react;
      if (!this.$auth.isAuthenticated()) {
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

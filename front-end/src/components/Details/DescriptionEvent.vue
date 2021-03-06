<template>
  <div class="description">
    <LoadingCircular :loading="loading" />
    <template v-if="!loading && event">
      <v-layout row wrap mt-3>
        <v-flex xs2 xl1 pl-3 pt-1>
          <v-img :src="getEventIcon()" max-width="25" max-height="25" />
        </v-flex>
        <v-flex xs9 md9 sm9 lg10 xl10 pl-2>
          <div>
            <h3 class="subheading blue--text text--darken-2 font-weight-bold">{{ event.title }}</h3>
            <span class="grey--text text--darken-1">โดย {{ event.contributor }}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-flex xs12 md12 lg12 pa-2 v-if="event.pictures.length > 0">
        <v-carousel hide-delimiters width="100%" height="230">
          <v-carousel-item
            v-for="(picture, index) in event.pictures"
            :key="index"
            :src="picture.url"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-card-text class="py-3">
        <div class="body-2 word-wrap">{{ event.description }}</div>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <div class="body-1 red--text">เกิดขึ้น ณ {{event.start | luxon:locale('short')}}</div>
        <div class="body-1 red--text">เวลาสิ้นสุด {{event.stop | luxon:locale('short')}}</div>
      </v-card-text>
      <v-card-actions class="py-0">
        <v-flex grow pl-1>
          <LikeDislikeControl :key="event.id" :eventId="event.id" />
        </v-flex>
        <v-flex shrink pr-2>
          <GoToEventButton :latitude="event.latitude" :longitude="event.longitude" />
          <v-btn flat icon color="grey" @click="show = !show">
            <v-icon>comment</v-icon>
          </v-btn>
          <span class="subheading ml-1">{{ event.comments.length }}</span>
        </v-flex>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show" class="pt-0">
          <CommentControl v-model="event.comments" :eventId="event.id" />
        </v-card-text>
      </v-slide-y-transition>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";
import LoadingCircular from "../Feedback/LoadingCircular";
import LikeDislikeControl from "../Feedback/LikeDislikeControl";
import CommentControl from "../Feedback/CommentControl";
import GoToEventButton from "./GoToEventButton";
export default {
  name: "DescriptionEvent",
  components: {
    LoadingCircular,
    LikeDislikeControl,
    CommentControl,
    GoToEventButton
  },
  data() {
    return {
      loading: false,
      show: false,
      event: null
    };
  },
  watch: {
    $route(to) {
      this.fetchEvent(to.params.eventId);
    }
  },
  created() {
    this.fetchEvent(this.$route.params.eventId);
  },
  methods: {
    ...mapActions("feedback", ["fetchFeedbackSummary"]),

    fetchEvent: async function(eventId) {
      this.loading = true;
      this.event = await eventApi.getEventById(eventId);
      this.loading = false;
      if (this.$auth.isAuthenticated) {
        const { sub: uid } = this.$auth.user;
        this.fetchFeedbackSummary(uid);
      } else {
        this.fetchFeedbackSummary();
      }
    },
    getEventIcon: function() {
      return eventConstant.selectIcon(this.event);
    }
  }
};
</script>
<style scoped>
.description {
  height: 80vh;
  overflow: auto;
}
.word-wrap {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>

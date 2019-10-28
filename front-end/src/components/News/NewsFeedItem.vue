<template>
  <v-card flat class="mb-2">
    <v-layout row wrap align-start justify-center fill-height>
      <v-layout row pt-2>
        <v-flex xs1 md1 lg1 mt-3 ml-3>
          <v-img :src="getEventIcon()" max-width="40" max-height="40" left></v-img>
        </v-flex>
        <v-flex xs11 md11 lg11 mt-1 ml-3 mr-1>
          <div>
            <h3 class="blue--text">{{event.title}}</h3>
            <div>โดย {{event.contributor}}</div>
          </div>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <v-flex xs12 md12 lg12 pa-2 v-if="event.pictures.length > 0">
          <v-carousel hide-delimiters width="100%" height="230">
            <v-carousel-item
              v-for="(picture,index) in event.pictures"
              :key="index"
              :src="picture.url"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-card-text class="px-3 pt-3 pb-0">{{event.description}}</v-card-text>
        <v-card-title class="px-3 py-3">
          <span class="red--text">
            เกิดขึ้น ณ
            : {{ event.start | luxon:locale('short') }}
            <br />
            จะสิ้นสุดใน
            : {{ event.stop | luxon:locale('short') }}
            <br />
          </span>
        </v-card-title>
      </v-flex>
      <v-flex grow pl-1>
        <LikeDislikeControl :key="event.id" :eventId="event.id" />
      </v-flex>
      <v-flex shrink pr-3>
        <v-btn flat icon color="grey" :loading="loading" @click="toggleCommentControl">
          <v-icon>comment</v-icon>
        </v-btn>
        <span class="subheading ml-1">{{commentCount}}</span>
      </v-flex>

<<<<<<< HEAD
      <v-layout v-show="show">
        <v-flex lg1 mt-4 ml-2>
          <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px" />
        </v-flex>
        <v-flex xs11 md11 lg11>
          <v-card-text>
            <div>
              <h3 class="blue--text">{{author}}</h3>
              <div>{{commentDetail}}</div>
              <div class="red--text">
                <v-icon>access_time</v-icon>
                {{postTime}}
              </div>
            </div>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-layout v-show="show">
        <v-flex lg1 mt-4 ml-2>
          <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px" />
        </v-flex>
        <v-flex xs11 md11 lg11>
          <v-card-text>
            <div>
              <h3 class="blue--text">{{author}}</h3>
              <div>{{commentDetail}}</div>
              <div class="red--text">
                <v-icon>access_time</v-icon>
                {{postTime}}
              </div>
            </div>
          </v-card-text>
        </v-flex>
      </v-layout>
      <!-- </v-slide-y-transition> -->
=======
      <v-slide-y-transition>
        <v-card-text v-show="show" class="pt-0">
          <CommentControl
            v-model="event.comments"
            :eventId="event.id"
            :isAuthenticated="isAuthenticated"
            :profile="profile"
          />
        </v-card-text>
      </v-slide-y-transition>
>>>>>>> 3b49208440f56752b2ef4379adfc9e73b38ff2a4
    </v-layout>
  </v-card>
</template>

<script>
import eventApi from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";
import LikeDislikeControl from "../Feedback/LikeDislikeControl";
import CommentControl from "../Feedback/CommentControl";
export default {
  name: "NewsFeedItem",
  props: {
    initEvent: Object,
    isAuthenticated: Boolean,
    profile: Object
  },
  components: {
    LikeDislikeControl,
    CommentControl
  },
  data() {
    return {
      loading: false,
      show: false,
      event: this.initEvent
    };
  },
  computed: {
    commentCount() {
      const { comments } = this.event;
      if (comments[0] && comments[0].count) return comments[0].count || 0;
      else return comments.length;
    }
  },
  methods: {
    getEventIcon: function() {
      return eventConstant.selectIcon(this.event);
    },
    toggleCommentControl: async function() {
      if (!this.show) {
        this.loading = true;
        const comments = await eventApi.getComments({
          eventId: this.event.id,
          orderByNew: true
        });
        this.event.comments = comments;
        this.loading = false;
      }
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
#description {
  margin-left: 30px;
  margin-right: 30px;
  color: white;
  font-size: 17px;
}
</style>
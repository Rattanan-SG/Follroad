<template>
  <v-card flat class="mb-2">
    <v-layout row wrap align-start justify-center fill-height>
      <v-layout>
        <v-flex xs1 md1 lg1 mt-3 ml-3>
          <v-img :src="getEventIcon()" max-width="40" max-height="40" left></v-img>
        </v-flex>
        <v-flex xs11 md11 lg11 mt-1 ml-3 mr-1>
          <!-- <v-list-tile>
            <v-list-tile-avatar>
              <v-img :src="getEventIcon()" max-width="40" max-height="40" left></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span class="font-weight-light">{{event.title}}</span>
            </v-list-tile-content>
          </v-list-tile>-->
          <!-- <v-card-title primary-title> -->
          <div>
            <h3 class="blue--text">{{event.title}}</h3>
            <div>โดย {{event.contributor}}</div>
          </div>
          <!-- </v-card-title> -->
        </v-flex>
      </v-layout>

      <v-flex xs12 pa-2>
        <!---------ใส่รูปเวลามีคนเพิ่มรูปเข้ามา---------->
        <v-carousel hide-controls width="200px" height="250px">
          <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
        <!--------------------------------------->
        <v-card-text class="pa-0 pt-2">{{event.description}}</v-card-text>
        <!-- <v-divider light></v-divider> -->
        <v-card-title class="pa-0 pt-2">
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

      <v-flex grow>
        <LikeDislikeControl :key="event.id" :eventId="event.id" />
      </v-flex>
      <v-flex shrink pr-4>
        <v-btn flat icon color="grey" :loading="loading" @click="toggleCommentControl">
          <v-icon>comment</v-icon>
        </v-btn>
        <span class="subheading ml-1">{{commentCount}}</span>
      </v-flex>
      <v-slide-y-transition>
        <v-card-text v-show="show" class="pt-0">
          <CommentControl
            :eventId="event.id"
            :comments="event.comments"
            :isAuthenticated="isAuthenticated"
            :profile="profile"
            @new-comment="addNewComment"
          />
        </v-card-text>
      </v-slide-y-transition>
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
      event: this.initEvent,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        }
      ]
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
          eventId: this.event.id
        });
        this.event.comments = comments;
        this.loading = false;
      }
      this.show = !this.show;
    },
    addNewComment: function(comment) {
      this.event.comments.unshift(comment);
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
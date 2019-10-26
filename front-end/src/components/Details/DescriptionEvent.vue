<template>
  <div class="description">
    <LoadingCircular :loading="loading" />
    <template v-if="!loading && event">
      <v-layout row wrap mt-3>
        <v-flex xs2 pl-3 pt-1>
          <v-img :src="getEventIcon()" max-width="25" max-height="25" />
        </v-flex>
        <v-flex xs9 lg10 md9 sm9 pl-2>
          <div>
            <h3 class="subheading blue--text">{{event.title}}</h3>
            <span>โดย {{event.contributor}}</span>
          </div>
        </v-flex>
      </v-layout>
      <!---------ใส่รูปเวลามีคนเพิ่มรูปเข้ามา---------->
      <v-flex xs12 md12 lg12 pa-2>
        <v-carousel hide-delimiters width="100%" height="230">
          <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
      </v-flex>
      <!--------------------------------------->
      <v-card-text class="py-0 pt-2">
        <div class="body-2">{{event.description}}</div>
        <br />
        <v-divider />
      </v-card-text>
      <v-card-text>
        <div class="body-1 red--text">เกิดขึ้น ณ {{event.start | luxon:locale('short')}}</div>
        <div class="body-1 red--text">จะสิ้นสุดใน {{event.stop | luxon:locale('short')}}</div>
      </v-card-text>
      <v-card-actions class="py-0">
        <v-flex grow>
          <LikeDislikeControl :key="event.id" :eventId="event.id" />
        </v-flex>
        <v-flex shrink pr-2>
          <v-btn flat icon color="grey" @click="show = !show">
            <v-icon>comment</v-icon>
          </v-btn>
          <span class="subheading ml-1">{{event.comments.length}}</span>
        </v-flex>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show" class="pt-0">
          <v-layout row wrap align-center v-if="this.$vuetify.breakpoint.smAndUp">
            <div class="mr-3">
              <v-avatar size="25px" v-if="isAuthenticated">
                <v-img :src="profile.picture" max-width="25" max-height="25" />
              </v-avatar>
              <v-icon v-else color="primary" medium>person</v-icon>
            </div>
            <v-textarea
              v-model="comment"
              :disabled="!isAuthenticated"
              :label="isAuthenticated ? 'แสดงความคิดเห็น' : 'เข้าสู่ระบบเพื่อแสดงความคิดเห็น'"
              rows="2"
              clearable
              no-resize
              :loading="commentLoading"
              append-outer-icon="send"
              @click:append-outer="sendMessage"
            ></v-textarea>
          </v-layout>

          <v-bottom-sheet v-model="sheet" full-width lazy v-else>
            <template v-slot:activator>
              <v-layout row wrap align-center>
                <div class="mr-3">
                  <v-avatar size="25px" v-if="isAuthenticated">
                    <v-img :src="profile.picture" max-width="25" max-height="25" />
                  </v-avatar>
                  <v-icon v-else color="primary" medium>person</v-icon>
                </div>
                <v-text-field
                  :disabled="!isAuthenticated"
                  :label="isAuthenticated ? 'แสดงความคิดเห็น' : 'เข้าสู่ระบบเพื่อแสดงความคิดเห็น'"
                  single-line
                ></v-text-field>
              </v-layout>
            </template>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-avatar size="35">
                    <v-img :src="profile.picture" max-width="35" max-height="35" />
                  </v-avatar>
                </v-list-tile-avatar>
                <v-textarea
                  v-model="comment"
                  autofocus
                  no-resize
                  rows="2"
                  single-line
                  clearable
                  :loading="commentLoading"
                  append-outer-icon="send"
                  @click:append-outer="sendMessage"
                ></v-textarea>
              </v-list-tile>
            </v-list>
          </v-bottom-sheet>

          <template v-for="(comment, index) in event.comments">
            <v-layout row wrap mb-3 :key="index">
              <div class="mr-3 pt-1">
                <v-avatar size="25px">
                  <v-img :src="comment.authorPictureUrl" max-width="25" max-height="25" />
                </v-avatar>
              </div>
              <v-flex xs10>
                <span class="subheading font-weight-medium indigo--text">{{comment.authorName}}</span>
                <br />
                <span class="subheading">{{comment.detail}}</span>
                <br />
                <span
                  class="caption grey--text text--darken-1"
                >ความเห็นเมื่อเวลา {{comment.updatedAt | luxon:locale('short')}}</span>
              </v-flex>
            </v-layout>
            <v-flex xs12 mb-3 :key="`divider-${index}`">
              <v-divider />
            </v-flex>
          </template>
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
export default {
  name: "DescriptionEvent",
  components: {
    LoadingCircular,
    LikeDislikeControl
  },
  data() {
    return {
      loading: false,
      commentLoading: false,
      isAuthenticated: false,
      profile: this.$auth.profile,
      show: false,
      sheet: false,
      event: null,
      comment: "",
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
  created() {
    this.fetchEvent(this.$route.params.eventId);
  },
  watch: {
    $route(to) {
      this.fetchEvent(to.params.eventId);
    }
  },
  methods: {
    ...mapActions("feedback", ["fetchFeedbackSummary"]),

    fetchEvent: async function(eventId) {
      this.loading = true;
      this.event = await eventApi.getEventById(eventId);
      this.loading = false;
      if (this.$auth.isAuthenticated()) {
        const { sub: uid } = this.$auth.profile;
        this.isAuthenticated = true;
        this.profile = this.$auth.profile;
        this.fetchFeedbackSummary(uid);
      } else {
        this.fetchFeedbackSummary();
      }
    },
    getEventIcon: function() {
      return eventConstant.selectIcon(this.event);
    },
    sendMessage: async function() {
      this.commentLoading = true;
      const data = {
        eventId: this.event.id,
        detail: this.comment
      };
      const result = await eventApi.postComment(data);
      this.event.comments.unshift(result);
      this.comment = "";
      this.commentLoading = false;
      this.sheet = false;
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  }
};
</script>
<style scoped>
.description {
  height: 80vh;
  overflow: auto;
}
</style>

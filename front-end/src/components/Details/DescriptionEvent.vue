<template>
  <div class="description">
    <LoadingCircular :loading="loading" />
    <template v-if="!loading && event">
      <v-layout row wrap mt-3>
        <v-flex xs2 pl-3 pt-1>
          <v-img :src="getEventIcon()" max-width="25" max-height="25" />
        </v-flex>
        <v-flex xs9 lg10 md9 sm9 pl-2>
          <!-- <v-card-title primary-title class="pt-0 pl-0"> -->
          <div>
            <h3 class="subheading blue--text">{{event.title}}</h3>
            <span>โดย {{event.contributor}}</span>
          </div>
          <!-- </v-card-title> -->
        </v-flex>
      </v-layout>
      <!---------ใส่รูปเวลามีคนเพิ่มรูปเข้ามา---------->
      <v-flex xs12 md12 lg12 pa-2>
        <v-carousel hide-controls width="200px" height="300px">
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
        <LikeDislikeControl :key="event.id" :eventId="event.id" />
      </v-card-actions>

      <v-layout row wrap pt-2 align-center justify-space-between>
        <v-flex shrink ml-3 pt-1>
          <v-avatar size="25px" v-if="isAuthenticated">
            <v-img :src="profile.picture" max-width="25" max-height="25" />
          </v-avatar>
          <v-icon v-else color="primary" medium>person</v-icon>
        </v-flex>
        <v-flex grow px-3>
          <v-textarea
            v-model="comment"
            :disabled="!isAuthenticated"
            :label="isAuthenticated ? 'แสดงความคิดเห็น' : 'เข้าสู่ระบบเพื่อแสดงความคิดเห็น'"
            rows="2"
            clearable
            append-outer-icon="send"
            @click:append-outer="sendMessage"
          ></v-textarea>
        </v-flex>

        <v-layout row wrap>
          <template v-for="comment in event.comments">
            <v-flex shrink ml-3 pt-4 :key="`avatar-${comment.id}`">
              <v-avatar size="25px">
                <v-img :src="comment.authorPictureUrl" max-width="25" max-height="25" />
              </v-avatar>
            </v-flex>
            <v-flex grow :key="`text-${comment.id}`">
              <v-card-text>
                <div>
                  <h3 class="blue--text">{{comment.authorName}}</h3>
                  <div>{{comment.detail}}</div>
                  <div class="red--text">{{postTime}}</div>
                </div>
              </v-card-text>
            </v-flex>
            <v-flex xs12 :key="`divider-${comment.id}`">
              <v-divider />
            </v-flex>
          </template>
        </v-layout>

        <!-- <v-layout row wrap>
          <v-flex xs1 pl-2 pt-3>
            <v-avatar size="25px">
              <v-img :src="profile.picture" max-width="25" max-height="25" />
            </v-avatar>
          </v-flex>
          <v-flex xs11>
            <v-card-text>
              <div>
                <h3 class="blue--text">{{author}}</h3>
                <div>{{commentDetail}}</div>
                <div class="red--text">{{postTime}}</div>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-divider />
          </v-flex>
          <v-flex xs1 pl-2 pt-3>
            <v-avatar size="25px">
              <img src="@/assets/logo.svg" alt="avatar" />
            </v-avatar>
          </v-flex>
          <v-flex xs11>
            <v-card-text>
              <div>
                <h3 class="blue--text">{{author}}</h3>
                <div>{{commentDetail}}</div>
                <div class="red--text">{{postTime}}</div>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-divider />
          </v-flex>
        </v-layout>-->
      </v-layout>
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
      isAuthenticated: false,
      profile: this.$auth.profile,
      event: null,
      comment: "",
      commentDetail:
        "รถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะ",
      author: "CEO Rattanan Nuan",
      postTime: "23/10/2019 11.00",
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
        await this.fetchFeedbackSummary(uid);
      } else {
        await this.fetchFeedbackSummary();
      }
    },
    getEventIcon: function() {
      return eventConstant.selectIcon(this.event);
    },
    sendMessage() {
      console.log(this.profile);
      this.event.comments.push(this.comment);
      this.comment = "";
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
  height: 78vh;
  overflow: auto;
}
</style>

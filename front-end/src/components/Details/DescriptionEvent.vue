<template>
  <div class="description">
    <LoadingCircular :loading="loading" />
    <template v-if="!loading && event">
      <v-layout row wrap mt-3>
        <v-flex xs2 pl-3 pt-1>
          <v-img :src="getEventIcon()" max-width="25" max-height="25"></v-img>
        </v-flex>
        <v-flex xs10 pl-1>
          <v-card-title primary-title class="pt-0 pl-0">
            <div>
              <h3 class="subheading blue--text">{{event.title}}</h3>
              <span>โดย {{event.contributor}}</span>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-card-text class="py-0">
        <div class="body-2">{{event.description}}</div>
        <br />
        <v-divider></v-divider>
      </v-card-text>
      <v-card-text>
        <div class="body-1 red--text">เกิดขึ้น ณ {{event.start | luxon:locale('short')}}</div>
        <div class="body-1 red--text">จะสิ้นสุดใน {{event.stop | luxon:locale('short')}}</div>
      </v-card-text>
      <v-card-actions class="py-0">
        <LikeDislikeControl :key="event.id" :eventId="event.id" />
      </v-card-actions>

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
      </v-layout>

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
      profile: this.$auth.profile,
      isAuthenticated: this.$auth.isAuthenticated(),
      event: null,
      comment: "",
      commentDetail:
        "รถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะ",
      author: "CEO Rattanan Nuan",
      postTime: "11.00"
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
        await this.fetchFeedbackSummary(uid);
      } else {
        await this.fetchFeedbackSummary();
      }
    },
    getEventIcon: function() {
      return eventConstant.selectIcon(this.event);
    },
    sendMessage() {
      this.comment = "";
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

<template>
  <v-card flat class="mb-2">
    <v-layout row wrap align-start justify-center fill-height>
      <v-layout>
        <v-flex xs1 md1 lg1 mt-4 ml-3>
          <v-img :src="getIcon()" max-width="40" max-height="40" left></v-img>
        </v-flex>
        <v-flex xs11 md11 lg11 mt-1 mr-3>
          <!-- <v-list-tile>
            <v-list-tile-avatar>
              <v-img :src="getIcon()" max-width="40" max-height="40" left></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span class="font-weight-light">{{event.title}}</span>
            </v-list-tile-content>
          </v-list-tile>-->
          <v-card-title primary-title>
            <div>
              <h3 class="blue--text">{{event.title}}</h3>
              <div>โดย {{event.contributor}}</div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-flex xs12>
        <!---------ใส่รูปเวลามีคนเพิ่มรูปเข้ามา---------->
        <!-- <v-carousel hide-delimiters width="50%" height="50%">
          <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>-->
        <!--------------------------------------->
        <v-card-text>{{event.description}}</v-card-text>
        <!-- <v-divider light></v-divider> -->
        <v-card-title>
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

      <!-- <v-card-actions> -->
      <v-flex grow>
        <LikeDislikeControl :key="event.id" :eventId="event.id" />
      </v-flex>
      <!-- <v-spacer></v-spacer> -->
      <v-flex xs3 md3 lg3 sm3>
        <v-btn flat icon color="grey" @click="show = !show">
          <v-icon>comment</v-icon>
        </v-btn>
      </v-flex>
      <!-- <v-flex md12 lg12 xs12>
        <v-divider></v-divider>
      </v-flex>-->
      <!-- </v-card-actions> -->

      <!-- <v-slide-y-transition> -->
      <v-flex lg12 md12 sm12 xs12>
        <v-divider v-if="show"></v-divider>
      </v-flex>
      <v-layout v-show="show">
        <v-flex xs1 md1 lg1 pt-3 pl-3 mr-2>
          <v-avatar size="30px">
            <img v-if="isAuthenticated" :src="profile.picture" alt="avatar" />
            <v-icon v-else color="primary" medium>person</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex xs10 md10 lg8 ml-4>
          <v-textarea
            v-model="comment"
            label="แสดงความคิดเห็น"
            rows="1"
            clearable
            auto-grow
            :disabled="!isAuthenticated"
          ></v-textarea>
        </v-flex>
        <v-flex xs2 md3 lg1 pt-2>
          <v-btn icon class="ma-0">
            <v-icon color="primary" medium>send</v-icon>
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
      </v-layout>

      <v-layout v-show="show">
        <v-flex lg1 xs1 md1 sm1 ml-3>
          <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px" />
        </v-flex>
        <v-flex xs10 md10 lg10 sm10 pl-3>
          <!-- <v-card-text> -->
          <div>
            <h3 class="blue--text">{{author}}</h3>
            <div>{{commentDetail}}</div>
            <div class="red--text">
              <!-- <v-icon>access_time</v-icon> -->
              วันที่ และเวลา
              {{postTime}}
            </div>
          </div>
          <!-- </v-card-text> -->
        </v-flex>
      </v-layout>
      <!-- </v-slide-y-transition> -->
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import eventConstant from "@/utilitys/eventConstant";
import LikeDislikeControl from "../Feedback/LikeDislikeControl";
export default {
  name: "NewsFeedItem",
  components: {
    LikeDislikeControl
  },
  data() {
    return {
      show: false,
      countLike: 0,
      countDislike: 0,
      comment: "",
      profile: this.$auth.profile,
      isAuthenticated: this.$auth.isAuthenticated(),
      commentDetail:
        "รถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะ",
      author: "CEO Rattanan Nuan",
      postTime: "23/10/2019 11.00 ",
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
  props: {
    event: Object
  },
  computed: {
    ...mapGetters("event", ["eventMarkerByEventId"])
  },
  methods: {
    getIcon: function() {
      return eventConstant.selectIcon(this.event);
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
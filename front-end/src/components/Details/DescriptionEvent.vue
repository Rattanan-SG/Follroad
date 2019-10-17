<template>
  <v-card flat max-width="100%" class="mx-auto">
    <v-layout v-if="!!infoWindow.marker">
      <v-flex xs12 md12 lg12>
        <v-layout pt-3>
          <v-flex xs2 md2 lg2 pl-3 pt-2>
            <v-img :src="infoWindow.marker.icon" max-width="25" max-height="25"></v-img>
          </v-flex>
          <v-flex xs12 md10 lg10>
            <v-card-title primary-title class="pt-0 pl-0">
              <div>
                <h3 class="subheading blue--text">{{infoWindow.marker.title}}</h3>
                <span>โดย {{infoWindow.marker.eventCaption.contributor}}</span>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-card-text class="py-0">
      <div class="body-2">{{infoWindow.marker.description}}</div>
      <br />
      <v-divider></v-divider>
    </v-card-text>
    <v-card-text>
      <div
        class="body-1 red--text"
      >เกิดขึ้น ณ {{infoWindow.marker.eventCaption.startTime | luxon:locale('short')}}</div>
      <div
        class="body-1 red--text"
      >จะสิ้นสุดใน {{infoWindow.marker.eventCaption.stopTime | luxon:locale('short')}}</div>
    </v-card-text>
    <v-card-actions>
      <LikeDislikeControl />
    </v-card-actions>
    <v-layout v-if="!!infoWindow.marker" pt-3>
      <v-flex xs2 md2 lg2 pt-3 pl-3 mr-2>
        <v-avatar size="30px">
          <img v-if="isAuthenticated" :src="profile.picture" alt="avatar" />
          <v-icon v-else color="primary" medium>person</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs10 md10 lg10>
        <v-textarea
          v-model="comment"
          label="แสดงความคิดเห็น"
          rows="1"
          clearable
          auto-grow
          :disabled="!isAuthenticated"
        ></v-textarea>
      </v-flex>
      <v-flex xs2 md2 lg2 pt-2 ml-3>
        <v-btn icon class="ma-0">
          <v-icon color="primary" medium>send</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-flex ml-3 mr-3>
      <v-divider></v-divider>
    </v-flex>

    <!-- <v-list three-line v-if="!!infoWindow.marker">
      <template>
        <v-list-tile>
          <v-flex mt-1 xs1 md1 lg1>
            <v-avatar size="30px">
              <img src="@/assets/logo.svg" alt="avatar" />
            </v-avatar>
          </v-flex>
          <v-flex ml-3 xs11 md11 lg11>
            <v-textarea :value="`${author.toUpperCase()} : ${commentDetail}`" rows="3" disabled outline></v-textarea>
          </v-flex>
        </v-list-tile>
      </template>
    </v-list> -->
    <v-layout>
      <v-flex lg1 mt-4 ml-2>
        <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px"/>
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
        <img src="@/assets/logo.svg" alt="avatar" width="30px" height="30px"/>
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
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LikeDislikeControl from "../Feedback/LikeDislikeControl";
export default {
  name: "DescriptionEvent",
  components: {
    LikeDislikeControl
  },
  data() {
    return {
      profile: this.$auth.profile,
      isAuthenticated: this.$auth.isAuthenticated(),
      dialog: false,
      show: false,
      countLike: 0,
      countDislike: 0,
      comment: "",
      commentDetail: "รถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะรถติดขนาดนี้นอนอยู่บ้านเหอะ",
      author: "CEO Rattanan Nuan",
      postTime: "11.00"
    };
  },
  computed: {
    ...mapGetters("infoWindow", ["infoWindow"])
  },
  methods: {
    ...mapActions("infoWindow", ["closeInfoWindow"])
  }
};
</script>
<style scoped>
.v-card {
  height: 70vh;
  overflow: auto;
}
</style>

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
        <!-- <div id="description">
          {{event.description}}
        </div>-->
        <v-card-text>{{event.description}}</v-card-text>
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
      <v-flex xs3 md5 lg3>
        <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
          <v-icon>thumb_up</v-icon>
        </v-btn>
        {{countLike}}
      </v-flex>
      <v-flex xs3 md5 lg3>
        <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
          <v-icon>thumb_down</v-icon>
        </v-btn>
        {{countDislike}}
      </v-flex>
      <!-- <v-spacer></v-spacer> -->
      <v-flex xs5 md8 lg6>
        <v-btn flat color="blue" @click="show = !show">แสดงความคิดเห็น</v-btn>
      </v-flex>
      <!-- </v-card-actions> -->
      <v-slide-y-transition>
        <v-layout v-show="show">
          <v-flex xs2 md2 lg2 pt-3 pl-3 mr-2>
            <v-avatar size="30px">
              <img v-if="isAuthenticated" :src="profile.picture" alt="avatar" />
              <v-icon v-else color="primary" medium>person</v-icon>
            </v-avatar>
          </v-flex>
          <v-flex xs7 md7 lg7>
            <v-textarea
              v-model="comment"
              label="แสดงความคิดเห็น"
              rows="1"
              outline
              clearable
              auto-grow
              :disabled="!isAuthenticated"
            ></v-textarea>
          </v-flex>
          <v-flex xs2 md2 lg2 pt-2 ml-3>
            <v-btn icon class="ma-0">
              <v-icon color="primary">send</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 md12 lg12>
            <v-list-tile>
              <v-flex mt-1 xs1 md1 lg1>
                <v-avatar size="30px">
                  <img src="@/assets/logo.svg" alt="avatar" />
                </v-avatar>
              </v-flex>
              <v-flex ml-3 xs9 md9 lg9>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <h3>ยังติดอยู่เลย</h3>

                    <v-list-tile-sub-title>ไม่ขยับมา 1 ชั่วโมงแล้ว</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-flex>
            </v-list-tile>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import eventConstant from "@/utilitys/eventConstant";
export default {
  name: "NewsFeedItem",
  data() {
    return {
      show: false,
      countLike: 0,
      countDislike: 0,
      comment: "",
      profile: this.$auth.profile,
      isAuthenticated: this.$auth.isAuthenticated()
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
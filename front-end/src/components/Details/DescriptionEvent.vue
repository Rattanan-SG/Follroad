<template>
  <div>
    <v-card flat height="70vh">
      <v-layout v-if="!!infoWindow.marker">
        <!-- <v-card height="50vh"> -->
        <v-flex xs12 md12 lg12>
          <v-layout>
            <v-flex xs2 md2 lg2 mt-4 ml-4>
              <v-img :src="infoWindow.marker.icon" max-width="40" max-height="40"></v-img>
            </v-flex>
            <v-flex xs10 md10 lg10>
              <v-card-title primary-title>
                <div>
                  <h3>{{infoWindow.marker.title}}</h3>
                  <div>โดย {{infoWindow.marker.eventCaption.contributor}}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>

          <v-card-text>
            <div>{{infoWindow.marker.description}}</div>
            <br />
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text>
            <div
              class="body-1"
            >เกิดขึ้น ณ {{infoWindow.marker.eventCaption.startTime | luxon:locale('short')}}</div>
            <div
              class="body-1"
            >จะสิ้นสุดใน {{infoWindow.marker.eventCaption.stopTime | luxon:locale('short')}}</div>
          </v-card-text>

          <v-flex xs12 md12 lg12>
            <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            {{countLike}}
            <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            {{countDislike}}
          </v-flex>
        </v-flex>
        <!-- </v-card> -->
      </v-layout>

      <br />
      <!-- <v-flex ml-3 mr-3>
      <v-divider></v-divider>
      </v-flex>-->

      <v-layout v-if="!!infoWindow.marker">
        <v-flex mt-3 ml-3 xs1 md1 lg1>
          <v-avatar size="30px">
            <img :src="profile ? profile.picture : '../assets/logo.svg'" alt="avatar" />
          </v-avatar>
        </v-flex>
        <v-flex ml-3 xs9 md9 lg9>
          <v-text-field label="แสดงความคิดเห็น" outline></v-text-field>
        </v-flex>
      </v-layout>

      <v-flex ml-3 mr-3>
        <v-divider></v-divider>
      </v-flex>

      <!-- <v-layout>
        <v-flex mt-3 ml-3 xs1 md1 lg1>
          <v-avatar size="30px">
            <img :src="profile.picture" alt="avatar" />
          </v-avatar>
        </v-flex>
        <v-flex ml-3 xs9 md9 lg9>
          <v-text-field label="แสดงความคิดเห็น" outlined></v-text-field>
        </v-flex>
      </v-layout>-->
      <!-- <v-card height="15vh"> -->
      <v-list three-line v-if="!!infoWindow.marker">
        <template>
          <v-list-tile>
            <v-flex mt-1 xs1 md1 lg1>
              <v-avatar size="30px">
                <img :src="profile.picture" alt="avatar" />
              </v-avatar>
            </v-flex>
            <v-flex ml-3 xs9 md9 lg9>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <h3>Profile photo</h3>

                  <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-list-tile>
        </template>
      </v-list>
      <v-flex ml-3 mr-3>
        <v-divider></v-divider>
      </v-flex>

      <v-list three-line v-if="!!infoWindow.marker">
        <template>
          <v-list-tile>
            <v-flex mt-1 xs1 md1 lg1>
              <v-avatar size="30px">
                <img :src="profile.picture" alt="avatar" />
              </v-avatar>
            </v-flex>
            <v-flex ml-3 xs9 md9 lg9>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <h3>Dio Oh Oh</h3>

                  <v-list-tile-sub-title>ORA ORA ORA ORA</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-list-tile>
        </template>
      </v-list>

      <v-flex ml-3 mr-3>
        <v-divider></v-divider>
      </v-flex>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DescriptionEvent",
  data() {
    return {
      profile: this.$auth.profile,
      dialog: false,
      show: false,
      countLike: 0,
      countDislike: 0
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

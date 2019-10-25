<template>
  <v-slide-y-transition>
    <v-card-text v-show="show" class="pt-0">
      <v-layout row wrap align-center>
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
          append-outer-icon="send"
          @click:append-outer="sendMessage"
        ></v-textarea>
      </v-layout>

      <template v-for="comment in event.comments">
        <v-layout row wrap mb-3 :key="`avatar-${comment.id}`">
          <div class="mr-3" :key="`divider-${comment.id}`">
            <v-avatar size="25px">
              <v-img :src="profile.picture" max-width="25" max-height="25" />
            </v-avatar>
          </div>
          <v-flex xs10>
            <span class="blue--text">{{author}}</span>
            <br />
            <span>{{commentDetail}}</span>
            <br />
            <span class="red--text">{{postTime}}</span>
          </v-flex>
        </v-layout>
        <v-flex xs12 mb-3 :key="`divider-${comment.id}`">
          <v-divider />
        </v-flex>
      </template>
    </v-card-text>
  </v-slide-y-transition>
</template>

<script>
import { mapActions } from "vuex";
import eventApi from "@/api/event";
export default {
  name: "CommentControl",
  props: {
    eventId: Number
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

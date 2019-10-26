<template>
  <div>
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
        :loading="loading"
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
            :loading="loading"
            append-outer-icon="send"
            @click:append-outer="sendMessage"
          ></v-textarea>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>

    <template v-for="(comment, index) in comments">
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
  </div>
</template>

<script>
import eventApi from "@/api/event";
export default {
  name: "CommentControl",
  props: {
    eventId: Number,
    comments: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isAuthenticated: Boolean,
    profile: Object
  },
  data() {
    return {
      loading: false,
      sheet: false,
      comment: null
    };
  },
  methods: {
    sendMessage: async function() {
      if (this.comment) {
        this.loading = true;
        const data = {
          eventId: this.eventId,
          detail: this.comment
        };
        const result = await eventApi.postComment(data);
        this.$emit("new-comment", result);
        this.comment = null;
        this.loading = false;
        this.sheet = false;
      }
    }
  }
};
</script>

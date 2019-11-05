<template>
  <div>
    <v-layout row wrap align-center v-if="this.$vuetify.breakpoint.smAndUp">
      <div class="mr-3">
        <v-avatar size="30px" v-if="$auth.isAuthenticated">
          <img :src="$auth.user.picture" alt="avatar" />
        </v-avatar>
        <v-icon v-else color="primary" medium>person</v-icon>
      </div>
      <v-textarea
        v-model="comment"
        :disabled="!$auth.isAuthenticated"
        :label="$auth.isAuthenticated ? 'แสดงความคิดเห็น' : 'เข้าสู่ระบบเพื่อแสดงความคิดเห็น'"
        rows="2"
        clearable
        no-resize
        :loading="loading"
        append-outer-icon="send"
        @click:append-outer="sendMessage"
      ></v-textarea>
    </v-layout>

    <v-bottom-sheet v-model="sheet" full-width lazy :disabled="!$auth.isAuthenticated" v-else>
      <template v-slot:activator>
        <v-layout row wrap align-center>
          <div class="mr-3">
            <v-avatar size="30px" v-if="$auth.isAuthenticated">
              <img :src="$auth.user.picture" alt="avatar" />
            </v-avatar>
            <v-icon v-else color="primary" medium>person</v-icon>
          </div>
          <v-text-field
            :disabled="!$auth.isAuthenticated"
            :label="$auth.isAuthenticated ? 'แสดงความคิดเห็น' : 'เข้าสู่ระบบเพื่อแสดงความคิดเห็น'"
            single-line
          ></v-text-field>
        </v-layout>
      </template>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-avatar size="35px" v-if="$auth.isAuthenticated">
              <img :src="$auth.user.picture" alt="avatar" />
            </v-avatar>
            <v-icon v-else color="primary" medium>person</v-icon>
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

    <template v-for="(comment, index) in value">
      <v-layout row wrap mb-3 :key="index">
        <v-flex xs1 class="mr-3 pt-1">
          <v-layout column align-center justify-center>
            <v-avatar size="30px">
              <img :src="comment.authorPictureUrl" alt="avatar" />
            </v-avatar>
            <v-btn
              v-if="$auth.user && $auth.user.sub === comment.uid "
              flat
              icon
              small
              color="blue-grey darken-1"
              class="my-1"
              @click.stop="deleteComment(index, comment.id)"
            >
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
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
import { mapActions } from "vuex";
import eventApi from "@/api/event";
export default {
  name: "CommentControl",
  props: {
    value: Array,
    eventId: Number
  },
  data() {
    return {
      loading: false,
      sheet: false,
      comment: null,
      comments: this.value
    };
  },
  watch: {
    value(value) {
      this.comments = value;
    }
  },
  methods: {
    ...mapActions("globalFeedback", ["openConfirmDialog"]),

    sendMessage: async function() {
      if (this.comment) {
        this.loading = true;
        const data = {
          eventId: this.eventId,
          detail: this.comment
        };
        const result = await eventApi.postComment(data);
        this.comments.unshift(result);
        this.$emit("input", this.comments);
        this.comment = null;
        this.loading = false;
        this.sheet = false;
      }
    },
    deleteComment: function(index, commentId) {
      this.openConfirmDialog({
        text: `ลบความคิดเห็นนี้ของคุณ`,
        submitActions: () => this.handleDeleteComment(index, commentId)
      });
    },
    handleDeleteComment: async function(index, commentId) {
      await eventApi.deleteCommentById(commentId);
      this.comments.splice(index, 1);
      this.$emit("input", this.comments);
    }
  }
};
</script>

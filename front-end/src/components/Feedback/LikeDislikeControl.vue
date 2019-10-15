<template>
  <div>
    <v-btn flat icon color="blue lighten-2" v-on:click="countLike++">
      <v-icon>thumb_up</v-icon>
    </v-btn>
    <span class="subheading mr-3">{{countLike}}</span>
    <v-btn flat icon color="red lighten-2" v-on:click="countDislike++">
      <v-icon>thumb_down</v-icon>
    </v-btn>
    <span class="subheading mr-3">{{countDislike}}</span>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "LikeDislikeControl",
  props: {
    initialLike: {
      type: Number,
      default: 0
    },
    initialDislike: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      countLike: this.initialLike,
      countDislike: this.initialDislike
    };
  },
  methods: {}
};
</script>

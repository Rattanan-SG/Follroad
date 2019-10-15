<template>
  <div>
    <v-btn flat icon :color="active === 1 ? 'blue lighten-2' : 'grey '" @click="handleClick(1)">
      <v-icon>thumb_up</v-icon>
    </v-btn>
    <span class="subheading mr-3">{{countLike}}</span>
    <v-btn flat icon :color="active === 0 ? 'red lighten-2' : 'grey '" @click="handleClick(0)">
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
    eventId: Number,
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
      active: null,
      countLike: this.initialLike,
      countDislike: this.initialDislike
    };
  },
  methods: {
    handleClick: function(value) {
      if (this.active === null) {
        value ? this.countLike++ : this.countDislike++;
        this.active = value;
      } else if (this.active === value) {
        this.active ? this.countLike-- : this.countDislike--;
        this.active = null;
      } else if (this.active !== value) {
        this.active ? this.countLike-- : this.countDislike--;
        value ? this.countLike++ : this.countDislike++;
        this.active = value;
      }
    }
  }
};
</script>

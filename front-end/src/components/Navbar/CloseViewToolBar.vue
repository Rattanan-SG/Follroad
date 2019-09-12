<template>
  <v-container fluid text-xs-center>
    <v-card-actions class="px-0">
      <v-btn icon v-if="!!leftIcon" @click="leftAction">
        <v-icon medium>{{leftIcon}}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="title font-weight-light">{{title}}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeRouterView">
        <v-icon medium>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CloseViewToolBar",
  props: {
    title: String,
    leftIcon: String,
    leftAction: Function
  },
  computed: {},
  methods: {
    ...mapActions("route", ["setRouterView"]),
    closeRouterView: function() {
      this.setRouterView(false);
    }
  }
};
</script>
<style scoped>
</style>

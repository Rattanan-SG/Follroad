<template>
  <v-card color="blue darken-3" flat>
    <v-container text-xs-center class="pa-0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs2>
          <v-btn icon v-if="!!leftIcon" @click="leftAction">
            <v-icon medium color="white">{{leftIcon}}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs8>
          <span class="title font-weight-light white--text">{{title}}</span>
        </v-flex>
        <v-flex xs2>
          <v-btn icon @click="setRouterView(false)">
            <v-icon medium color="white">close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
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
    ...mapActions("route", ["setRouterView"])
  }
};
</script>
<style scoped>
</style>

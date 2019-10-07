<template>
  <!-- <v-card color="blue darken-3" flat>
    <v-container text-xs-center class="pa-0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs2>
          <v-btn icon v-if="!!leftIcon" @click="leftAction">
            <v-icon color="white">{{leftIcon}}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs8>
          <span class="title font-weight-light white--text">{{title}}</span>
        </v-flex>
        <v-flex xs2>
          <v-btn icon @click="setRouterView(false)">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card> -->
  <div>
    <v-toolbar color="blue darken-3" flat height="40%">
      <v-layout align-center>
        <v-flex xs1 md2 lg2 sm2>
          <v-btn icon v-if="!!leftIcon" @click="leftAction">
            <v-icon color="white">{{leftIcon}}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 md3 lg3 sm3></v-flex>
        <v-flex xs7 md7 lg7 sm7 ml-3>
          <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        </v-flex>
        <v-flex xs1 md1 lg1 sm1>
          <v-btn icon @click="setRouterView(false)">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
  </div>
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

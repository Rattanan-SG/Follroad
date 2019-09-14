<template>
  <v-bottom-nav app fixed dark :value="true" color="indigo">
    <v-btn flat @click="closeRouterview">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn
      router
      flat
      v-for="list in lists"
      :key="list.text"
      :to="list.route"
      @click="setRouterView(true)"
    >
      <span>{{list.text}}</span>
      <v-icon>{{list.icon}}</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "BottomMenuBar",
  data() {
    return {
      lists: [
        { text: "Feed", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Profile", icon: "person", route: "/profile" }
      ]
    };
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    closeRouterview: function() {
      this.setRouterView(false);
    }
  }
};
</script>
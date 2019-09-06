<template>
  <v-bottom-nav app :value="true" color="indigo" absolute dark>
    <v-btn
      flat
      router
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
        { text: "Home", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Profile", icon: "person", route: "/profile" }
      ]
    };
  },
  methods: {
    ...mapActions("route", ["setRouterView"])
  }
};
</script>
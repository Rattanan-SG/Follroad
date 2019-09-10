<template>
  <v-bottom-nav
    app
    :value="true"
    color="indigo"
    absolute
    dark
    :fixed="toolbar.fixed"
    :clipped-left="toolbar.clippedLeft"
    scrollable
  >
    <v-btn flat router @click="closeRouterview">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>
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
        { text: "Feed", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Profile", icon: "person", route: "/profile" }
      ],
      toolbar: {
        fixed: true,
        clippedLeft: false
      }
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
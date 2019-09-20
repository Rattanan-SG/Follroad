<template>
  <v-bottom-nav app fixed dark :active.sync="bottomNav" :value="true" color="indigo">
    <v-btn flat key="Home" value="Home" @click="setRouterView(false)">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn
      v-for="list in lists"
      flat
      :key="list.text"
      :value="list.text"
      @click="changeRoute(list.path)"
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
      bottomNav: "Home",
      lists: [
        { text: "Feed", icon: "today", path: "/" },
        { text: "Search", icon: "directions", path: "/search" },
        { text: "Forum", icon: "forum", path: "/news" },
        { text: "Profile", icon: "person", path: "/profile" }
      ]
    };
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    changeRoute: function(path) {
      if (this.$route.path != path) this.$router.push(path);
      this.setRouterView(true);
    }
  }
};
</script>
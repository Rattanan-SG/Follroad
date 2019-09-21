<template>
  <v-bottom-nav app fixed dark :active.sync="bottomNav" :value="true" color="indigo">
    <v-btn flat key="Home" value="Home" @click="setRouterView(false)">
      <span>แผนที่</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn
      v-for="list in lists"
      flat
      :key="list.text"
      :value="list.value"
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
        { value: "Feed", text: "เหตุการณ์", icon: "today", path: "/" },
        {
          value: "Directions",
          text: "เดินทาง",
          icon: "directions",
          path: "/search"
        },
        { value: "Forum", text: "ข่าว", icon: "forum", path: "/news" },
        { value: "Profile", text: "โปรไฟล์", icon: "person", path: "/profile" }
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
<template>
  <v-card height="8%" flat class="hidden-sm-and-up">
    <v-bottom-nav :active.sync="bottomNav" :value="showNav" height="60%">
      <v-btn
        color="deep-purple accent-4"
        flat
        v-for="list in lists"
        :key="list.text"
        :to="list.route"
        router
        @click="toggleRouterView(list.route)"
      >
        <span>{{list.text}}</span>
        <v-icon>{{list.icon}}</v-icon>
      </v-btn>
      <!-- <v-btn color="teal" flat to="/ProfileMobile">
        <span>Menu</span>
        <v-icon>menu</v-icon>
      </v-btn>-->
    </v-bottom-nav>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import HomeFeedList from "./HomeFeedList.vue";
export default {
  // components: {
  //   HomeFeedList
  // },
  data() {
    return {
      bottomNav: 1,
      showNav: true,
      dialog: false,
      bottomMenuBar: {
        fixed: true,
        clippedLeft: false
      },
      lists: [
        { text: "Feed", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Notifications", icon: "notifications" },
        { text: "Forum", icon: "forum", route: "/news" },
        { text: "Menu", icon: "menu", route: "/profilemobile" }
      ]
    };
  },
  computed: {
    ...mapGetters("route", ["routerView"])
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    toggleRouterView: function(route) {
      if ((this.activeRouter = route)) {
        this.setRouterView(true);
      }
    }
  }
};
</script>
<template>
  <v-card height="8%" flat class="hidden-sm-and-up">
    <v-bottom-nav :active.sync="bottomNav" :value="true" height="60%">
      <v-btn color="teal" flat router @click="toggleRouterView()">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        color="teal"
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
      <!-- </v-dialog> -->
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
      bottomNav: "recent",
      dialog: false,
      bottomMenuBar: {
        fixed: true,
        clippedLeft: false
      },
      lists: [
        { text: "Feed", icon: "today", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Notifications", icon: "notifications" },
        { text: "Forum", icon: "forum", route: "/news" }
      ]
    };
  },
  computed: {
    ...mapGetters(["myLocation", "searchPlace", "showRouterView"])
  },
  methods: {
    ...mapActions(["setShowRouterView"]),
    toggleRouterView: function(route) {
      if (this.activeRouter == route) {
        this.setShowRouterView(!this.showRouterView);
      } else {
        this.activeRouter = route;
        this.setShowRouterView(true);
      }
    }
  }
};
</script>
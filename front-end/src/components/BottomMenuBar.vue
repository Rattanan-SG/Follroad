<template>
  <v-card height="8%" flat class="hidden-sm-and-up">
    <v-bottom-nav :active.sync="bottomNav" :value="true" height="60%">
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
    </v-bottom-nav>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      bottomNav: "recent",
      bottomMenuBar: {
        fixed: true,
        clippedLeft: false
      },
      lists: [
        { text: "Home", icon: "home", route: "/" },
        { text: "Search", icon: "directions", route: "/search" },
        { text: "Feed", icon: "today", route: "/news" },
        { text: "Notifications", icon: "notifications" }
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
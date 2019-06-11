<template>
  <div>
    <v-layout>
      <v-flex xs1 pt-2 class="hidden-sm-and-up">
        <v-btn flat icon @click="toggleRouterView()">
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 mx-2>
        <HomeSearchEvent/>
      </v-flex>
    </v-layout>
    <v-layout justify-center mb-2>
      <HomeFilterEventCategory/>
    </v-layout>
    <HomeFeedList/>
  </div>
</template> 

<script>
const HomeFeedList = () => import("../components/HomeFeedList");
const HomeFilterEventCategory = () =>
  import("../components/HomeFilterEventCategory");
const HomeSearchEvent = () => import("../components/HomeSearchEvent");
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    HomeFeedList,
    HomeFilterEventCategory,
    HomeSearchEvent
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

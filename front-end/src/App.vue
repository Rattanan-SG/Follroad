<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex
          v-if="routerView || this.$route.path == '/callback'"
          xl3
          lg3
          md3
          sm4
          xs12
          style="z-index: 2"
        >
          <v-card flat height="100%">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </v-card>
        </v-flex>
        <v-flex>
          <GoogleMap />
        </v-flex>
      </v-layout>
      <RefreshSnackBar />
      <CurrentPositionButton />
    </v-content>
    <BottomMenuBar v-if="this.$vuetify.breakpoint.xsOnly" />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
const GoogleMap = () => import("./components/GoogleMap/GoogleMap");
const RefreshSnackBar = () => import("./components/RefreshSnackBar.vue");
const BottomMenuBar = () => import("./components/Navbar/BottomMenuBar");
const CurrentPositionButton = () =>
  import("./components/FloatingButton/CurrentPositionButton");
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    GoogleMap,
    RefreshSnackBar,
    BottomMenuBar,
    CurrentPositionButton
  },
  computed: {
    ...mapGetters("route", ["routerView"])
  },
  async created() {
    this.fetchEvents();
    this.$vuetify.breakpoint.xsOnly
      ? this.setRouterView(false)
      : this.setRouterView(true);
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("event", ["fetchEvents"])
  },
  destroyed() {}
};
</script>
<style scoped>
</style>
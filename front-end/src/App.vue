<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex
          v-if="routerView || this.$route.path == '/callback'"
          md3
          sm5
          xs12
          style="z-index: 2"
        >
          <v-card flat tile height="100%">
            <router-view></router-view>
          </v-card>
        </v-flex>
        <v-flex>
          <GoogleMap />
        </v-flex>
      </v-layout>
      <RefreshSnackBar />
      <ToggleRecommendRoute v-if="directionsResponse" />
      <CurrentPositionButton />
      <LoginDialog />
    </v-content>
    <BottomMenuBar v-if="this.$vuetify.breakpoint.xsOnly" />
  </v-app>
</template>

<script>
const Navbar = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "navbar" */ "./components/Navbar/Navbar"
  );
const GoogleMap = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "googlemap" */ "./components/GoogleMap/GoogleMap"
  );
const RefreshSnackBar = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "refreshsnackbar" */ "./components/RefreshSnackBar.vue"
  );
const BottomMenuBar = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "bottommenubar" */ "./components/Navbar/BottomMenuBar"
  );
const CurrentPositionButton = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "currentpositionbutton" */ "./components/FloatingButton/CurrentPositionButton"
  );
const ToggleRecommendRoute = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "togglerecommendroute" */ "./components/HistoryRoute/ToggleRecommendRoute"
  );
const LoginDialog = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "logindialog" */
    "./components/LoginDialog"
  );
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    GoogleMap,
    RefreshSnackBar,
    BottomMenuBar,
    CurrentPositionButton,
    LoginDialog,
    ToggleRecommendRoute
  },
  computed: {
    ...mapGetters("route", ["routerView"]),
    ...mapGetters("direction", ["directionsResponse"])
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
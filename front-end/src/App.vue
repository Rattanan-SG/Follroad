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
          fill-height
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
      <LoginDialog />
      <ConfirmDialog />
      <MessageSnackbar />
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
const BottomMenuBar = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "bottommenubar" */ "./components/Navbar/BottomMenuBar"
  );
const RefreshSnackBar = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "refreshsnackbar" */ "./components/RefreshSnackBar.vue"
  );
const LoginDialog = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "logindialog" */
    "./components/Feedback/LoginDialog"
  );
const ConfirmDialog = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "confirmdialog" */
    "./components/Feedback/ConfirmDialog"
  );
const MessageSnackbar = () =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "messagesnackbar" */
    "./components/Feedback/MessageSnackbar"
  );
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    GoogleMap,
    RefreshSnackBar,
    BottomMenuBar,
    LoginDialog,
    ConfirmDialog,
    MessageSnackbar
  },
  computed: {
    ...mapGetters("route", ["routerView"])
  },
  async created() {
    this.$vuetify.breakpoint.xsOnly
      ? this.setRouterView(false)
      : this.setRouterView(true);
    await this.fetchEvents();
    if (this.$auth.isAuthenticated()) {
      const { sub: uid } = this.$auth.profile;
      await this.fetchUserFeedbacks(uid);
    }
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("event", ["fetchEvents", "fetchUserFeedbacks"]),
    ...mapActions("googleMap", ["stopWatchMyLocation"])
  },
  beforeDestroy() {
    this.stopWatchMyLocation();
  }
};
</script>
<style scoped>
</style>
<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex v-if="routerView" lg3 md4 sm5 xs12 style="z-index: 2" fill-height>
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
    /* webpackPreload: true */
    /* webpackChunkName: "navbar" */ "./components/Navbar/Navbar"
  );
const GoogleMap = () =>
  import(
    /* webpackPreload: true */
    /* webpackChunkName: "googlemap" */ "./components/GoogleMap/GoogleMap"
  );
const BottomMenuBar = () =>
  import(
    /* webpackPreload: true */
    /* webpackChunkName: "bottommenubar" */ "./components/Navbar/BottomMenuBar"
  );
const RefreshSnackBar = () =>
  import(
    /* webpackPreload: true */
    /* webpackChunkName: "refreshsnackbar" */ "./components/RefreshSnackBar.vue"
  );
const LoginDialog = () =>
  import(
    /* webpackChunkName: "logindialog" */
    "./components/Feedback/LoginDialog"
  );
const ConfirmDialog = () =>
  import(
    /* webpackChunkName: "confirmdialog" */
    "./components/Feedback/ConfirmDialog"
  );
const MessageSnackbar = () =>
  import(
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
  watch: {
    async "$auth.user"(value) {
      if (value) {
        const { sub: uid } = value;
        await this.fetchFeedbackSummary(uid);
      } else {
        this.fetchFeedbackSummary();
      }
    },
    $route(value) {
      if (value.meta.initRouterView) {
        this.setRouterView(true);
      }
    }
  },
  async created() {
    this.fetchEvents();
    this.$vuetify.breakpoint.xsOnly
      ? this.setRouterView(false)
      : this.setRouterView(true);
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("feedback", ["fetchFeedbackSummary"]),
    ...mapActions("googleMap", ["stopWatchMyLocation"])
  },
  beforeDestroy() {
    this.stopWatchMyLocation();
  }
};
</script>

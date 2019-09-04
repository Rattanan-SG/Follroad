<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-layout row wrap fill-height>
        <v-flex v-if="routerView" xl3 lg3 md3 sm4 xs12 style="z-index: 2">
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
    </v-content>
    <BottomMenuBar v-if="this.$vuetify.breakpoint.xsOnly" />
  </v-app>
</template>

<script>
const Navbar = () => import("./components/Navbar/Navbar");
const BottomMenuBar = () => import("./components/Navbar/BottomMenuBar");
const GoogleMap = () => import("./components/GoogleMap/GoogleMap");
const RefreshSnackBar = () => import("./components/RefreshSnackBar.vue");
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    BottomMenuBar,
    GoogleMap,
    RefreshSnackBar
  },
  computed: {
    ...mapGetters("route", ["routerView"])
  },
  async created() {
    try {
      await this.$auth.renewTokens();
      this.fetchEvents();
      this.$vuetify.breakpoint.xsOnly
        ? this.setRouterView(false)
        : this.setRouterView(true);
    } catch (e) {
      console.error(e);
    }
  },
  mounted() {
    this.getMyLocation();
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("googleMap", ["setCenter", "getMyLocation"]),
    ...mapActions("event", ["fetchEvents"])
  },
  destroyed() {}
};
</script>
<style scoped>
</style>
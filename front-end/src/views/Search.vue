<template>
  <div>
    <BackToolBar title="เดินทาง" />
    <SearchStartAutoComplete />
    <SearchDestinationAutoComplete />
    <v-layout row wrap my-3 justify-center>
      <SaveRoute />
      <v-btn
        v-if="!directionsRenderer"
        color="blue"
        class="white--text"
        @click="startDirections"
      >ค้นหาเส้นทาง</v-btn>
      <v-btn v-else color="red" class="white--text" @click="stopDirections">ยกเลิกเส้นทาง</v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 my-1>
        <SearchFeedPanel v-if="directionsRenderer" />
      </v-flex>
      <v-flex xs12 ml-1>
        <SearchRoutePanel v-if="directionsRenderer" :directionsRenderer="directionsRenderer" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "@/main";
import BackToolBar from "@/components/Navbar/BackToolBar";
const SearchStartAutoComplete = () =>
  import("@/components/Search/SearchStartAutoComplete");
const SearchDestinationAutoComplete = () =>
  import("@/components/Search/SearchDestinationAutoComplete");
const SaveRoute = () => import("@/components/Search/SaveRoute");
const SearchFeedPanel = () => import("@/components/Search/SearchFeedPanel");
const SearchRoutePanel = () => import("@/components/Search/SearchRoutePanel");
export default {
  name: "Search",
  components: {
    BackToolBar,
    SearchStartAutoComplete,
    SearchDestinationAutoComplete,
    SaveRoute,
    SearchFeedPanel,
    SearchRoutePanel
  },
  data() {
    return {
      startLocation: null,
      destinationLocation: null
    };
  },
  computed: {
    ...mapGetters("googleMap", ["myLocation"]),
    ...mapGetters("search", ["searchPlace"]),
    ...mapGetters("route", ["routerView"]),
    ...mapGetters("direction", ["directionsRenderer"])
  },
  // mounted() {
  //   this.setupAutoComplete();
  // },
  watch: {
    // startLocation(val) {
    //   if (val != this.myLocation.location) this.isMyLocationActive = false;
    // }
  },
  methods: {
    ...mapActions("search", ["setSearchPlace"]),
    ...mapActions("direction", ["setDirection"]),
    ...mapActions("route", ["setRouterView"]),
    startDirections: function() {
      if (this.startLocation && this.destinationLocation) {
        eventBus.startDirections(this.startLocation, this.destinationLocation);
        this.$vuetify.breakpoint.xsOnly
          ? this.setRouterView(false)
          : this.setRouterView(true);
      }
    },
    stopDirections: function() {
      this.$refs.start.$el.value = null;
      this.startLocation = null;
      this.setSearchPlace(null);
      this.setDirection(null);
      eventBus.stopDirections();
      this.goToThisPage("/");
    },
    goToThisPage: function(path) {
      if (this.$route.path != path) {
        this.$router.push(path);
        this.$vuetify.breakpoint.xsOnly
          ? this.setRouterView(false)
          : this.setRouterView(true);
      }
    }
  }
};
</script>
<style scoped>
</style>

<template>
  <div>
    <BackToolBar title="เดินทาง" />
    <SearchStartAutoComplete />
    <SearchDestinationAutoComplete />
    <v-layout row wrap my-3 justify-center>
      <SearchSaveRouteButton v-if="directionsRenderer" />
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
      <v-flex xs12>
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
const SearchSaveRouteButton = () =>
  import("@/components/Search/SearchSaveRouteButton");
const SearchFeedPanel = () => import("@/components/Search/SearchFeedPanel");
const SearchRoutePanel = () => import("@/components/Search/SearchRoutePanel");
export default {
  name: "Search",
  data() {
    return {
      historyStartPlace: { name: "dgd" }
    };
  },
  components: {
    BackToolBar,
    SearchStartAutoComplete,
    SearchDestinationAutoComplete,
    SearchSaveRouteButton,
    SearchFeedPanel,
    SearchRoutePanel
  },
  computed: {
    ...mapGetters("direction", [
      "startLocation",
      "destinationLocation",
      "directionsRenderer"
    ])
  },
  methods: {
    ...mapActions("search", ["setSearchPlace"]),
    ...mapActions("direction", ["setStartLocation", "setDestinationLocation"]),
    ...mapActions("route", ["setRouterView"]),
    startDirections: function() {
      if (this.startLocation && this.destinationLocation) {
        eventBus.startDirections(
          this.startLocation.location,
          this.destinationLocation.location
        );
        this.$vuetify.breakpoint.xsOnly
          ? this.setRouterView(false)
          : this.setRouterView(true);
      }
    },
    stopDirections: function() {
      this.setSearchPlace(null);
      eventBus.stopDirections();
    }
  }
};
</script>
<style scoped>
</style>

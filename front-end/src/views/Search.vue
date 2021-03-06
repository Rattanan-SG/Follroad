<template>
  <div>
    <CloseViewToolBar title="เดินทาง" />
    <SearchStartAutoComplete ref="startAutoComplete" :historyMode="historyMode" />
    <SearchDestinationAutoComplete ref="destinationAutoComplete" :historyMode="historyMode" />
    <v-layout row wrap my-3 justify-center>
      <SearchSaveRouteDialog
        v-if="directionsResponse"
        :historyMode="historyMode"
        :startLocation="startLocation"
        :destinationLocation="destinationLocation"
        :directionsResponse="directionsResponse"
      />
      <v-btn
        v-if="!directionsResponse"
        round
        depressed
        color="blue"
        class="white--text"
        @click="startDirections"
        :disabled="loading"
        :loading="loading"
      >ค้นหาเส้นทาง</v-btn>
      <v-btn v-else round color="red" class="white--text" @click="stopDirections" depressed>
        ยกเลิกเส้นทาง
        <v-icon class="ml-2">close</v-icon>
      </v-btn>
    </v-layout>
    <v-alert
      :value="warning"
      outline
      color="warning"
      icon="priority_high"
      class="mx-3"
    >กรุณากรอกจุดเริ่มต้นและจุดหมาย เพื่อค้นหาเส้นทาง</v-alert>

    <v-layout row wrap v-if="directionsResponse">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <div class="subheading px-3 pb-3 blue--text text--darken-3">
          <v-icon class="mr-2" color="primary">info</v-icon>รายละเอียดการเดินทางและเหตุการณ์ที่เกี่ยวข้อง
        </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="panel">
        <SearchFeedPanel />
        <SearchRoutePanel :directionsRenderer="directionsRenderer" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "@/main";
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const SearchStartAutoComplete = () =>
  import("@/components/Search/SearchStartAutoComplete");
const SearchDestinationAutoComplete = () =>
  import("@/components/Search/SearchDestinationAutoComplete");
const SearchSaveRouteDialog = () =>
  import("@/components/Search/SearchSaveRouteDialog");
const SearchFeedPanel = () => import("@/components/Search/SearchFeedPanel");
const SearchRoutePanel = () => import("@/components/Search/SearchRoutePanel");
export default {
  name: "Search",
  data() {
    return {
      loading: false,
      warning: false
    };
  },
  components: {
    CloseViewToolBar,
    SearchStartAutoComplete,
    SearchDestinationAutoComplete,
    SearchSaveRouteDialog,
    SearchFeedPanel,
    SearchRoutePanel
  },
  computed: {
    ...mapGetters("direction", [
      "startLocation",
      "destinationLocation",
      "directionsRenderer",
      "directionsResponse"
    ]),
    ...mapGetters("directionRecord", ["historyMode"])
  },
  methods: {
    ...mapActions("search", ["setSearchPlace"]),
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("directionRecord", ["setHistoryMode"]),

    startDirections: function() {
      if (this.startLocation && this.destinationLocation) {
        this.warning = false;
        eventBus.startDirections(
          this.startLocation.location,
          this.destinationLocation.location
        );
        this.$vuetify.breakpoint.xsOnly
          ? this.setRouterView(false)
          : this.setRouterView(true);
      } else {
        this.warning = true;
      }
    },
    stopDirections: function() {
      if (this.historyMode) {
        this.$router.push("/historyroute");
        this.setHistoryMode(null);
      }
      this.setSearchPlace(null);
      this.$refs.startAutoComplete.setStartToMyLocation();
      this.$refs.destinationAutoComplete.resetDestinationPlace();
      eventBus.stopDirections();
    }
  }
};
</script>
<style scoped>
.panel {
  max-height: 45vh;
  overflow: auto;
}
</style>

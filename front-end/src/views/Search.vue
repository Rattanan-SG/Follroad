<template>
  <div>
    <v-layout row wrap pt-1>
      <v-flex xs12 class="hidden-sm-and-up" pl-4>
        <v-btn flat icon @click="toggleRouterView()">
          <v-icon large>keyboard_arrow_left</v-icon>
          <h3>แผนที่</h3>
        </v-btn>
      </v-flex>

      <v-flex xs1 pl-3>
        <v-btn
          icon
          small
          flat
          @click="setStartToMyLocation"
          :class="[isMyLocationActive ? 'is-active' : null]"
        >
          <v-icon>my_location</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs9 ml-4 pl-3>
        <gmap-autocomplete
          @place_changed="setStartLocation"
          ref="start"
          placeholder="จุดเริ่มต้น"
          class="pl-2"
          style="background-color: #E0E0E0; width:100%; height:100%"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-3>
      <!-- <v-flex xs1></v-flex> -->
      <v-flex xs1 pl-3>
        <v-btn icon small>
          <v-icon>place</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs9 ml-4 pl-3>
        <gmap-autocomplete
          @place_changed="setDestinationLocation"
          ref="destination"
          placeholder="จุดหมาย"
          class="pl-2"
          style="background-color: #E0E0E0; width:100%; height:100%"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
      </v-flex>
    </v-layout>
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
        <SearchPanel v-if="directionsRenderer" :directionsRenderer="directionsRenderer" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const SearchPanel = () => import("../components/SearchPanel");
const SearchFeedPanel = () => import("../components/SearchFeedPanel");
import SaveRoute from "../components/SaveRoute";
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "../main";
export default {
  name: "Search",
  components: {
    SearchPanel,
    SearchFeedPanel,
    SaveRoute
  },
  data() {
    return {
      startLocation: null,
      destinationLocation: null,
      isMyLocationActive: false
    };
  },
  computed: {
    ...mapGetters([
      "myLocation",
      "searchPlace",
      "showRouterView",
      "directionsRenderer"
    ])
  },
  mounted() {
    this.setupAutoComplete();
  },
  watch: {
    searchPlace() {
      this.setupAutoComplete();
    },
    startLocation(val) {
      if (val != this.myLocation.location) this.isMyLocationActive = false;
    }
  },
  methods: {
    ...mapActions(["setSearchPlace", "setDirection", "setShowRouterView"]),
    toggleRouterView: function(route) {
      if (this.activeRouter == route) {
        this.setShowRouterView(!this.showRouterView);
      } else {
        this.activeRouter = route;
        this.setShowRouterView(true);
      }
    },
    setupAutoComplete: function() {
      if (this.myLocation && this.startLocation == null) {
        this.setStartToMyLocation();
      }
      if (this.searchPlace) {
        this.$refs.destination.$el.value = this.searchPlace.name;
        this.destinationLocation = this.searchPlace.geometry.location;
      } else {
        this.$refs.destination.$el.value = null;
        this.destinationLocation = null;
      }
    },
    setStartLocation: function(place) {
      if (place) {
        if (place.geometry) {
          this.startLocation = place.geometry.location;
        }
      }
    },
    setDestinationLocation: function(place) {
      if (place) {
        if (place.geometry) {
          this.setSearchPlace(place);
          this.destinationLocation = place.geometry.location;
        }
      }
    },
    startDirections: function() {
      if (this.startLocation && this.destinationLocation) {
        eventBus.startDirections(this.startLocation, this.destinationLocation);
        this.$vuetify.breakpoint.xsOnly
          ? this.setShowRouterView(false)
          : this.setShowRouterView(true);
      }
    },
    stopDirections: function() {
      this.$refs.start.$el.value = null;
      this.startLocation = null;
      this.setSearchPlace(null);
      this.setDirection(null);
      eventBus.stopDirections();
      this.$router.push("/");
    },
    setStartToMyLocation: function() {
      this.isMyLocationActive = true;
      this.$refs.start.$el.value = this.myLocation.name;
      this.startLocation = this.myLocation.location;
    }
  }
};
</script>
<style scoped>
.is-active {
  background-color: #4169e1;
  color: white;
}
</style>

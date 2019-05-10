<template>
  <div>
    <br>
    <v-layout row wrap>
      <v-flex xs1 md1 lg1 sm1 ml-2>
        <v-icon>my_location</v-icon>
      </v-flex>
      <v-flex xs10 md10 lg10 sm10>
        <gmap-autocomplete
          @place_changed="setStartLocation"
          ref="start"
          placeholder="จุดเริ่มต้น"
          class="pl-2 ml-2"
          style="background-color: #E0E0E0; width:100%; height:120%"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap>
      <v-flex xs1 md1 lg1 sm1 ml-2>
        <v-icon>place</v-icon>
      </v-flex>
      <v-flex xs10 md10 lg10 sm10>
        <gmap-autocomplete
          @place_changed="setDestinationLocation"
          ref="destination"
          placeholder="จุดหมาย"
          class="pl-2 ml-2"
          style="background-color: #E0E0E0; width:100%; height:120%"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
      </v-flex>
      <v-flex xs12 md12 lg12 mt-3>
        <v-layout align-end justify-end>
          <v-btn color="blue-grey" class="white--text" @click="startDirections">ค้นหาเส้นทาง</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 ma-1>
        <SearchFeedPanel v-if="directionsRenderer"/>
      </v-flex>
      <v-flex xs12 ml-1>
        <SearchPanel v-if="directionsRenderer" :directionsRenderer="directionsRenderer"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const SearchPanel = () => import("../components/SearchPanel");
const SearchFeedPanel = () => import("../components/SearchFeedPanel");
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "../main";
export default {
  name: "Search",
  components: {
    SearchPanel,
    SearchFeedPanel
  },
  data() {
    return {
      startLocation: null,
      destinationLocation: null
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
    }
  },
  methods: {
    ...mapActions(["setSearchPlace", "setShowRouterView"]),
    setupAutoComplete: function() {
      if (this.myLocation) {
        this.$refs.start.$el.value = this.myLocation.name;
        this.startLocation = this.myLocation.location;
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
    }
  }
};
</script>
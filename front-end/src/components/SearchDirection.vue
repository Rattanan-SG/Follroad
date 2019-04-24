<template>
  <div>
    <v-layout row wrap>
      <v-flex xs2 md1 pt-3>
        <v-icon>my_location</v-icon>
      </v-flex>
      <v-flex xs10 md11 pl-3>
        <gmap-autocomplete
          @place_changed="setStartLocation"
          ref="start"
          placeholder="จุดเริ่มต้น"
          style="background-color: white; width:100%; height:120%"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs2 md1 pt-3>
        <v-icon>place</v-icon>
      </v-flex>
      <v-flex xs10 md11 pl-3>
        <gmap-autocomplete
          @place_changed="setDestinationLocation"
          ref="destination"
          placeholder="จุดหมาย"
          style="background-color: white; width:100%; height:120%"
          :select-first-on-enter="true"
        ></gmap-autocomplete>
      </v-flex>
      <v-flex xs12 md12 px-1>
        <v-layout align-end justify-end fill-height>
          <v-btn color="blue-grey" class="white--text" @click="startDirections">ค้นหาเส้นทาง</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12>หก</v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "../main";
export default {
  name: "SearchDirection",
  data() {
    return {
      startLocation: null,
      destinationLocation: null
    };
  },
  computed: {
    ...mapGetters(["myLocation", "searchPlace", "showRouterView"])
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
    ...mapActions([
      "setCenter",
      "setZoomLevel",
      "setSearchPlace",
      "setDirection",
      "setShowRouterView"
    ]),
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

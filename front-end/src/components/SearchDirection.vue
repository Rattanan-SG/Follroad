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
      <v-flex xs12 md12 lg12 pt-3>
        <v-layout align-end justify-end fill-height>
          <v-btn color="blue-grey" class="white--text" @click="startDirections">ค้นหาเส้นทาง</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 pl-1>
        <div id="panel" ref="panel" @click="loggg"></div>
      </v-flex>
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
      destinationLocation: null,
      directionsRenderer: null,
      timer: null
    };
  },
  computed: {
    ...mapGetters(["myLocation", "searchPlace", "showRouterView"])
  },
  created() {
    eventBus.$on("setPanel", directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
      this.directionsRenderer.setPanel(this.$refs.panel, function() {
        console.log(45555);
      });
      // let a = this.$refs.panel;
      // console.log(a.querySelectorAll("tr"));

      // let a = this.$refs.panel.children[0].querySelectorAll("tr");
      // console.log(a);

      // a.map(b => {
      //   b.addEventListener(
      //     "click",
      //     function() {
      //       console.log(565556566);
      //     },
      //     false
      //   );
      // });
    });
    // this.timer = setInterval(this.loggg, 30000);
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
    loggg: function() {
      // this.directionsRenderer.setRouteIndex(1);
      let a = this.$refs.panel.children[0].querySelectorAll("tr");
      console.log(a);

      a.forEach((b, index) => {
        b.addEventListener(
          "click",
          function() {
            console.log(index);
          },
          false
        );
      });
      // a.map(b => {
      //   b.addEventListener(
      //     "click",
      //     function() {
      //       console.log(565556566);
      //     },
      //     false
      //   );
      // });

      console.log(this.directionsRenderer.getRouteIndex());
    },
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
<style scoped>
#panel {
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  height: 600px;
  overflow: auto;
}
</style>

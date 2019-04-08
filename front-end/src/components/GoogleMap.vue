<template>
  <!-- <div>
    <div class="teal accent-3">
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs2 md1>
              <v-icon>my_location</v-icon>
            </v-flex>
            <v-flex xs9 md10>
              <gmap-autocomplete id="auto" @place_changed="setStartPlace"></gmap-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs2 md1>
              <v-icon>place</v-icon>
            </v-flex>
            <v-flex xs9 md10>
              <gmap-autocomplete id="auto" @place_changed="setEndPlace"></gmap-autocomplete>
            </v-flex>
            <v-flex xs12 md12>
              <div class="text-xs-right">
                <v-btn round color="light-blue accent-4 white--text" v-on:click="getRoute">Get Route</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
  </div>-->
  <gmap-map
    ref="gmap"
    :center="center"
    :zoom="15"
    :options="{
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        scaleControl: true, 
        zoomControl: false
      }"
    @click="isOnEdge"
  >
    <v-btn
      icon
      style="top: 80%;right: 0; background-color: #4169E1	; color: white; position: absolute; z-index: 100"
      slot="visible"
    >
      <v-icon>gps_fixed</v-icon>
    </v-btn>
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >{{infoContent}}</gmap-info-window>
    <gmap-marker :position="myLocation"></gmap-marker>
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.infoText"
      :icon="m.icon"
      @click="toggleInfoWindow(m,index)"
    ></gmap-marker>
  </gmap-map>
  <!-- <div id="directionsPanel" style="width:50%;height 100%"></div>
  </div>-->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { gmapApi } from "vue2-google-maps";
import axios from "@/utilitys/axios";

export default {
  name: "GoogleMap",
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null,
      currentMidx: null,
      infoContent: "",
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      coords: null,
      destination: null,
      directionsService: null,
      directionsRenderer: null,
      startDirection: "",
      endDirection: "",
      path: [],
      polyline: null,
      timer: null
    };
  },

  computed: {
    ...mapGetters({
      center: "getCenter",
      myLocation: "getMyLocation"
    }),
    google: gmapApi
  },

  created() {
    this.getEvent();
    // this.timer = setInterval(this.getEvent, 3000)
  },

  mounted() {
    this.geolocate();
    this.$gmapApiPromiseLazy().then(() => {
      let trafficLayer = new this.google.maps.TrafficLayer();
      trafficLayer.setMap(this.$refs.gmap.$mapObject);
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsRenderer = new this.google.maps.DirectionsRenderer();
    });
  },

  methods: {
    ...mapActions({
      setCenter: "setCenter",
      setMyLocation: "setMyLocation"
    }),

    isOnEdge: function(event) {
      // console.log(event);
      if (this.polyline) {
        let onEdge = this.google.maps.geometry.poly.isLocationOnEdge(
          event.latLng,
          this.polyline,
          0.0003
        );
        // console.log(event.latLng.lat(), event.latLng.lng());
        // console.log(onEdge);
        onEdge;
      }
    },
    setStartPlace: function(place) {
      this.coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    },
    setEndPlace: function(place) {
      this.destination = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    },
    pushMarker: function(lat, lng, infoText, icon) {
      this.markers.push({
        position: {
          lat: lat,
          lng: lng
        },
        infoText: infoText,
        icon: icon
      });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        this.setCenter({ lat: lat, lng: lng });
        this.setMyLocation({ lat: lat, lng: lng });
      });
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getRoute: function() {
      if (this.directionsRenderer != null) {
        this.directionsRenderer.setMap(null);
        this.directionsRenderer.setPanel(null);
      }
      this.directionsRenderer.setMap(this.$refs.gmap.$mapObject);
      this.directionsRenderer.setPanel(
        document.getElementById("directionsPanel")
      );
      this.directionsService.route(
        {
          origin: this.coords,
          destination: this.destination,
          travelMode: "DRIVING",
          provideRouteAlternatives: true
        },
        (response, status) => {
          if (status === "OK") {
            console.log(response);
            // this.path = this.google.maps.geometry.encoding.decodePath(
            //   response.routes[0].overview_polyline
            // );

            this.polyline = new this.google.maps.Polyline({
              path: response.routes[0].overview_path
            });

            // response.routes[0].overview_path.map(x => {
            //   this.pushMarker(x.lat(), x.lng(), "dd");
            // });

            this.directionsRenderer.setDirections(response);
          }
        }
      );
    },
    getEvent: function() {
      axios.get("/events").then(response => {
        let events = response.data;
        // this.markers = [];
        events.map(event => {
          let icon = "";
          switch (event.icon) {
            case "carbreakdown":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/carbreakdown.png";
              break;
            case "construction":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/construction.png";
              break;
            case "accident":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/accident.png";
              break;
            case "information":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/information.png";
              break;
            case "trafficjam":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/traffic+jam.png";
              break;
            case "warning":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/warning.png";
              break;
            case "event":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/event.png";
              break;
            case "demonstration":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/demonstration.png";
              break;
            case "fire":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/fire.png";
              break;
            case "flood":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/flood.png";
              break;
            case "rain":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/rain.png";
              break;
            case "sale":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/sale.png";
              break;
            case "checkpoint":
              icon =
                "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/checkpoint.png";
              break;
          }
          this.pushMarker(
            Number(event.latitude),
            Number(event.longitude),
            event.description,
            icon
          );
        });
      });
    }
  }
  // beforeDestroy() {
  //   clearInterval(this.timer)
  // }
};
</script>
<style scoped>
.v-content,
.vue-map-container,
.vue-map {
  width: 100%;
  height: 100%;
}
</style>

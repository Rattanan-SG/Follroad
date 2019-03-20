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
      }"
    @click="isOnEdge"
  >
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >{{infoContent}}</gmap-info-window>
    <gmap-marker :position="myLocation.position"></gmap-marker>
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.infoText"
      @click="toggleInfoWindow(m,index)"
    ></gmap-marker>
  </gmap-map>
  <!-- <div id="directionsPanel" style="width:50%;height 100%"></div>
  </div>-->
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import axios from "@/utilitys/axios";

export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 13.7563, lng: 100.5018 },
      myLocation: {},
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
    isOnEdge(event) {
      // console.log(event);
      if (this.polyline) {
        let onEdge = this.google.maps.geometry.poly.isLocationOnEdge(
          event.latLng,
          this.polyline,
          0.0003
        );
        console.log(event.latLng.lat(), event.latLng.lng());
        console.log(onEdge);
      }
    },
    setStartPlace(place) {
      this.coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    },
    setEndPlace(place) {
      this.destination = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    },
    pushMarker(lat, lng, infoText) {
      this.markers.push({
        position: {
          lat: lat,
          lng: lng
        },
        infoText: infoText
      });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.center = {
          lat: lat,
          lng: lng
        };
        this.myLocation = { position: { lat, lng } };
      });
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
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
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    },
    getEvent: function() {
      axios
        .get("/events")
        .then(response => {
          let events = response.data;
          // this.markers = [];
          events.map(event => {
            this.pushMarker(
              Number(event.latitude),
              Number(event.longitude),
              event.description
            );
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  // beforeDestroy() {
  //   clearInterval(this.timer)
  // }
};
</script>
<style scoped>
#auto {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

<template>
  <div>
    <div>
      <!-- <h2>Get Route</h2> -->
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs2>
              <v-card-text>
                <p class="text-xs-right">Start</p>
              </v-card-text>
            </v-flex>
              <v-flex xs10>
                <v-card dark color="primary">
                    <gmap-autocomplete @place_changed="setStartPlace"></gmap-autocomplete>
                </v-card>
              </v-flex>

            <v-flex xs2>
              <v-card-text>
                <p class="text-xs-right">Stop</p>
              </v-card-text>
            </v-flex>
            <v-flex xs10>
              <v-card dark color="primary">
                <gmap-autocomplete @place_changed="setEndPlace"></gmap-autocomplete>
              </v-card>
            </v-flex>
            <div class="text-xs-right">
               <v-btn round color="primary" v-on:click="getRoute">Get Route</v-btn>
            </div>

              <!----<label>จุดเริ่มต้น:
                <gmap-autocomplete @place_changed="setStartPlace"></gmap-autocomplete>
                
                ปลายทาง:
                <gmap-autocomplete @place_changed="setEndPlace"></gmap-autocomplete>
                <button @click="getRoute">Get Route</button>
              </label>---->
            
          </v-layout>  
        </v-container>
      </v-form>
      <br>
    </div>
    <br>
    <gmap-map ref="gmap" :center="center" :zoom="15" style="width:100%;  height: 500px;">
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >{{infoContent}}</gmap-info-window>
      <!-- <gmap-marker :position="myLocation.position"></gmap-marker> -->
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :title="m.infoText"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

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
      endDirection: ""
    };
  },

  computed: {
    google: gmapApi
  },

  mounted() {
    this.geolocate();
    this.$gmapApiPromiseLazy().then(() => {
      var trafficLayer = new this.google.maps.TrafficLayer();
      trafficLayer.setMap(this.$refs.gmap.$mapObject);
    });
  },

  methods: {
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
        this.directionsRenderer = null;
      }
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsRenderer = new this.google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.$refs.gmap.$mapObject);
      this.directionsService.route(
        {
          origin: this.coords,
          destination: this.destination,
          travelMode: "DRIVING"
        },
        (response, status) => {
          if (status === "OK") {
            console.log(response);
            // response.routes[0].overview_path.map(x => {
            //   this.pushMarker(x.lat(),
            //     x.lng(),"dd"
            //   );
            // });

            this.directionsRenderer.setDirections(response);
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    }
  }
};
</script>

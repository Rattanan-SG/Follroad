<template>
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
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >{{infoContent}}</gmap-info-window>
    <gmap-marker :position="myLocation"></gmap-marker>
    <gmap-marker
      v-if="searchPlace"
      :position="searchPlaceMarker.position"
      :title="searchPlaceMarker.title"
      @click="toggleInfoWindow(searchPlaceMarker,searchPlace.id)"
    ></gmap-marker>
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.title"
      :icon="m.icon"
      @click="toggleInfoWindow(m,index)"
    ></gmap-marker>
    <v-btn icon @click="resetCenterToMyLocation" slot="visible">
      <v-icon>gps_fixed</v-icon>
    </v-btn>
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
      myLocation: "getMyLocation",
      searchPlace: "getSearchPlace"
    }),
    searchPlaceMarker: function() {
      return {
        position: this.searchPlace.geometry.location,
        infoText: `
            ${this.searchPlace.name}\n
            ${this.searchPlace.formatted_address}
        `,
        title: this.searchPlace.name
      };
    },
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
    pushMarker: function(lat, lng, infoText, title, icon) {
      this.markers.push({
        position: {
          lat: lat,
          lng: lng
        },
        infoText: infoText,
        title: title,
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
    resetCenterToMyLocation: function() {
      this.$refs.gmap.$mapObject.setCenter(this.myLocation);
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
    getEvent: async function() {
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
            event.title,
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
.v-btn {
  bottom: 10%;
  right: 0.5%;
  background-color: #4169e1;
  color: white;
  position: absolute;
  z-index: 1;
}
</style>

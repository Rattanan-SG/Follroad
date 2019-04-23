<template>
  <gmap-map
    ref="gmap"
    :center="center"
    :zoom="zoomLevel"
    :options="{
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        scaleControl: true, 
        zoomControl: false
      }"
    @click="isOnEdge"
  >
    <gmap-marker :position="myLocation"></gmap-marker>
    <gmap-info-window
      v-if="infoWindow.marker"
      :options="infoWindow.infoOptions"
      :position="infoWindow.marker.position"
      :opened="infoWindow.infoWindowOpen"
      @closeclick="closeInfoWindow"
    >
      <h2>{{infoWindow.marker.title}}</h2>
      <br>
      <p>{{infoWindow.marker.description}}</p>
      <v-divider></v-divider>
      <br>
      <p>เริ่ม : {{infoWindow.marker.startTime}}</p>
      <p>จบลงใน : {{infoWindow.marker.stopTime}}</p>
      ลงข้อมูลโดย : {{infoWindow.marker.contributor}}
    </gmap-info-window>
    <gmap-marker
      :key="marker.eid"
      v-for="(marker) in markers"
      :position="marker.position"
      :title="marker.title"
      :icon="marker.icon"
      @click="setInfoWindow(marker)"
    ></gmap-marker>
    <gmap-marker
      v-if="searchPlace"
      :position="searchPlaceMarker.position"
      :title="searchPlaceMarker.title"
      @click="setInfoWindow(searchPlaceMarker)"
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
import { eventBus } from "../main";

export default {
  name: "GoogleMap",
  data() {
    return {
      directionsService: null,
      directionsRenderer: null,
      path: [],
      polyline: null,
      timer: null
    };
  },
  computed: {
    ...mapGetters([
      "center",
      "zoomLevel",
      "myLocation",
      "searchPlace",
      "events",
      "markers",
      "infoWindow"
    ]),
    searchPlaceMarker: function() {
      return {
        id: this.searchPlace.id,
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
    eventBus.$on("startDirections", ({ startLocation, stopLocation }) => {
      this.getRoute(startLocation, stopLocation);
    });
    eventBus.$on("stopDirections", () => {
      this.cleanRoute();
    });
    // this.timer = setInterval(this.getEvent, 3000)
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      let trafficLayer = new this.google.maps.TrafficLayer();
      trafficLayer.setMap(this.$refs.gmap.$mapObject);
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsRenderer = new this.google.maps.DirectionsRenderer();
    });
  },
  methods: {
    ...mapActions([
      "setCenter",
      "setMyLocation",
      "setDirection",
      "setInfoWindow",
      "closeInfoWindow"
    ]),
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
    resetCenterToMyLocation: function() {
      this.$refs.gmap.$mapObject.setCenter(this.myLocation);
      this.$refs.gmap.$mapObject.setZoom(15);
    },
    getRoute: function(startLocation, stopLocation) {
      if (this.directionsRenderer.getMap() != null) {
        this.cleanRoute();
      }
      this.directionsService.route(
        {
          origin: startLocation,
          destination: stopLocation,
          travelMode: "DRIVING",
          provideRouteAlternatives: true
        },
        (response, status) => {
          if (status === "OK") {
            this.setDirection(response);
            // this.path = this.google.maps.geometry.encoding.decodePath(
            //   response.routes[0].overview_polyline
            // );
            this.polyline = new this.google.maps.Polyline({
              path: response.routes[0].overview_path
            });
            // แสดงจุดบนเส้นทาง
            // response.routes[0].overview_path.map(x => {
            //   this.pushMarker(x.lat(), x.lng(), "dd");
            // });
            this.directionsRenderer.setMap(this.$refs.gmap.$mapObject);
            this.directionsRenderer.setDirections(response);
            // this.directionsRenderer.setPanel(
            //   document.getElementById("directionsPanel")
            // );
          }
        }
      );
    },
    cleanRoute: function() {
      this.directionsRenderer.setPanel(null);
      this.directionsRenderer.setMap(null);
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

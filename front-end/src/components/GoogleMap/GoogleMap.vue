<template>
  <gmap-map ref="gmap" :center="center" :zoom="zoomLevel" :options="options" @click="aa">
    <GoogleMapInfoWindow />
    <gmap-marker v-if="myLocation" :position="myLocation.location" :title="myLocation.name"></gmap-marker>
    <gmap-cluster :max-zoom="10" :zoom-on-click="true">
      <gmap-marker
        :key="eventMarker.id"
        v-for="eventMarker in eventMarkers"
        :position="eventMarker.position"
        :title="eventMarker.title"
        :icon="eventMarker.icon"
        @click="setInfoWindow(eventMarker)"
      ></gmap-marker>
    </gmap-cluster>
    <gmap-marker
      v-if="searchPlaceMarker"
      :position="searchPlaceMarker.position"
      :title="searchPlaceMarker.title"
      @click="setInfoWindow(searchPlaceMarker)"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "@/main";
import { gmapApi } from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import checkPermission from "@/utilitys/checkPermission";
import GoogleMapInfoWindow from "./GoogleMapInfoWindow";
export default {
  name: "GoogleMap",
  components: {
    GmapCluster,
    GoogleMapInfoWindow
  },
  data() {
    return {
      options: {
        minZoom: 5,
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        scaleControl: false,
        zoomControl: false,
        streetViewControl: false
      },
      directionsService: null,
      directionsRenderer: null,
      isDirections: false
    };
  },
  computed: {
    ...mapGetters("googleMap", ["center", "zoomLevel", "myLocation"]),
    ...mapGetters("event", ["eventMarkers"]),
    ...mapGetters("search", ["searchPlaceMarker"]),
    google: gmapApi
  },
  created() {
    eventBus.$on("startDirections", ({ startLocation, stopLocation }) => {
      this.getRoute(startLocation, stopLocation);
    });
    eventBus.$on("stopDirections", () => {
      this.cleanRoute();
    });
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(async gmap => {
      const trafficLayer = new gmap.maps.TrafficLayer();
      this.directionsService = new gmap.maps.DirectionsService();
      this.directionsRenderer = new gmap.maps.DirectionsRenderer();
      trafficLayer.setMap(this.$refs.gmap.$mapObject);
      this.directionsRenderer.setMap(this.$refs.gmap.$mapObject);
      this.setDirectionsRenderer(this.directionsRenderer);
      this.setMapObject(this.$refs.gmap.$mapObject);
      this.setGoogleClass(this.google);
      if ((await checkPermission("geolocation")) == "granted") {
        this.setMyLocation();
      }
    });
  },
  methods: {
    ...mapActions("googleMap", [
      "setMapObject",
      "setGoogleClass",
      "setMyLocation"
    ]),
    ...mapActions("direction", [
      "setDirectionsResponse",
      "setDirectionsRenderer",
      "selectRoute"
    ]),
    ...mapActions("infoWindow", ["setInfoWindow"]),

    aa: function(e) {
      console.log(JSON.stringify(e.latLng));
    },
    getRoute: function(startLocation, stopLocation) {
      if (this.isDirections) {
        this.cleanRoute();
      }
      this.directionsService.route(
        {
          origin: startLocation,
          destination: stopLocation,
          travelMode: "DRIVING",
          provideRouteAlternatives: true
          // drivingOptions: {
          //   departureTime: new Date()
          // }
        },
        async (response, status) => {
          if (status === "OK") {
            console.log(response);
            // console.log(JSON.stringify(response));
            // const { data } = await axios.get(
            //   `${process.env.VUE_APP_DIRECTION_RECORD_URL}/record/5d5d295cd6927600422718d1`
            // );
            // console.log(data.direction);

            // console.log(
            //   response.routes[0].overview_path.map(a => {
            //     return a.lat() + ", " + a.lng();
            //   })
            // );
            // this.path = this.google.maps.geometry.encoding.decodePath(
            //   response.routes[0].overview_polyline
            // );
            this.directionsRenderer.setMap(this.$refs.gmap.$mapObject);
            this.directionsRenderer.setDirections(response);
            this.setDirectionsRenderer(this.directionsRenderer);
            this.setDirectionsResponse(response);
            this.selectRoute(0);
            this.isDirections = true;
          }
        }
      );
    },
    cleanRoute: function() {
      this.directionsRenderer.setPanel(null);
      this.directionsRenderer.setMap(null);
      this.directionsService = new this.google.maps.DirectionsService();
      this.setDirectionsResponse(null);
      this.isDirections = false;
    }
  }
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

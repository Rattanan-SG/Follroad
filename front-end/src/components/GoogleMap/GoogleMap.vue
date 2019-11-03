<template>
  <gmap-map ref="gmap" :center="center" :zoom="zoomLevel" :options="options" @click="initPostEvent">
    <MarkerMyLocation :myLocation="myLocation" />
    <GoogleMapInfoWindow />
    <gmap-cluster :max-zoom="10" :zoom-on-click="true">
      <MarkerEvent />
    </gmap-cluster>
    <MarkerPostEvent />
    <MarkerSearchPlace />
    <CurrentPositionButton slot="visible" />
    <EnablePostEventButton slot="visible" />
    <ToggleRecommendRoute v-if="!routerView && directionsResponse" slot="visible" />
    <ToggleSpecificEvent v-if="!routerView && directionsResponse" slot="visible" />
  </gmap-map>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { eventBus } from "@/main";
import { gmapApi } from "vue2-google-maps";
import checkPermission from "@/utilitys/checkPermission";
const GmapCluster = () => import("vue2-google-maps/dist/components/cluster");
const GoogleMapInfoWindow = () => import("./GoogleMapInfoWindow");
const MarkerEvent = () => import("./MarkerEvent");
const MarkerMyLocation = () => import("./MarkerMyLocation");
const MarkerPostEvent = () => import("./MarkerPostEvent");
const MarkerSearchPlace = () => import("./MarkerSearchPlace");
const CurrentPositionButton = () =>
  import("@/components/FloatingButton/CurrentPositionButton");
const EnablePostEventButton = () =>
  import("@/components/FloatingButton/EnablePostEventButton");
const ToggleRecommendRoute = () =>
  import("@/components/FloatingButton/ToggleRecommendRoute");
const ToggleSpecificEvent = () =>
  import("@/components/FloatingButton/ToggleSpecificEvent");
export default {
  name: "GoogleMap",
  components: {
    GmapCluster,
    GoogleMapInfoWindow,
    MarkerEvent,
    MarkerMyLocation,
    MarkerPostEvent,
    MarkerSearchPlace,
    CurrentPositionButton,
    EnablePostEventButton,
    ToggleRecommendRoute,
    ToggleSpecificEvent
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
      geocoder: null,
      isDirections: false
    };
  },
  computed: {
    ...mapGetters("googleMap", ["center", "zoomLevel", "myLocation"]),
    ...mapGetters("direction", ["directionsRenderer", "directionsResponse"]),
    ...mapGetters("postEvent", ["activePostEvent"]),
    ...mapGetters("route", ["routerView"]),
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
      trafficLayer.setMap(this.$refs.gmap.$mapObject);
      this.geocoder = new gmap.maps.Geocoder();
      this.directionsService = new gmap.maps.DirectionsService();
      const directionsRenderer = new gmap.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.$refs.gmap.$mapObject);
      this.setDirectionsRenderer(directionsRenderer);
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
      "setMyLocation",
      "setCenter",
      "setZoomLevel"
    ]),
    ...mapActions("direction", [
      "setDirectionsResponse",
      "setDirectionsRenderer",
      "startDirectionsRenderer",
      "stopDirectionsRenderer"
    ]),
    ...mapActions("postEvent", ["setPostEventLocation"]),

    initPostEvent: function(e) {
      if (this.activePostEvent) {
        const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        this.geocoder.geocode({ location }, (response, status) => {
          let title = "";
          if (status === "OK") {
            if (response[0]) title = response[0].formatted_address;
          }
          this.setPostEventLocation({
            title,
            location
          });
          this.setZoomLevel(20);
          this.setCenter(location);
        });
      }
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
        },
        async (response, status) => {
          if (status === "OK") {
            this.setDirectionsResponse(response);
            this.startDirectionsRenderer();
            this.isDirections = true;
          }
        }
      );
    },
    cleanRoute: function() {
      this.stopDirectionsRenderer();
      this.directionsService = new this.google.maps.DirectionsService();
      this.isDirections = false;
    }
  }
};
</script>
<style scoped>
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
}
</style>

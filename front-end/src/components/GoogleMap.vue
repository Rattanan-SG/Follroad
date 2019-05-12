<template>
  <gmap-map ref="gmap" :center="center" :zoom="zoomLevel" :options="options">
    <gmap-marker v-if="myLocation" :position="myLocation.location" :title="myLocation.name"></gmap-marker>
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
      <v-divider/>
      <br>
      <template v-if="infoWindow.marker.eventCaption">
        <p>เกิดเหตุการณ์ขึ้น ณ : {{infoWindow.marker.eventCaption.startTime}}</p>
        <p>จะสิ้นสุดใน : {{infoWindow.marker.eventCaption.stopTime}}</p>
        <p>ลงข้อมูลโดย : {{infoWindow.marker.eventCaption.contributor}}</p>
      </template>
      <template v-if="infoWindow.marker.searchPlaceCaption">
        <img
          :src="infoWindow.marker.searchPlaceCaption.photo"
          :alt="infoWindow.marker.title"
          width="350"
          height="200"
        >
      </template>
    </gmap-info-window>
    <gmap-cluster :max-zoom="10" :zoom-on-click="true">
      <gmap-marker
        :key="marker.eid"
        v-for="(marker) in markers"
        :position="marker.position"
        :title="marker.title"
        :icon="marker.icon"
        @click="setInfoWindow(marker)"
      ></gmap-marker>
    </gmap-cluster>
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
import GmapCluster from "vue2-google-maps/dist/components/cluster";

export default {
  name: "GoogleMap",
  components: {
    GmapCluster
  },
  data() {
    return {
      options: {
        minZoom: 5,
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        scaleControl: true,
        zoomControl: false
      },
      directionsService: null,
      directionsRenderer: null
    };
  },
  computed: {
    ...mapGetters([
      "center",
      "zoomLevel",
      "myLocation",
      "events",
      "markers",
      "searchPlace",
      "searchPlaceMarker",
      "infoWindow"
    ]),
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
    this.$gmapApiPromiseLazy().then(() => {
      let trafficLayer = new this.google.maps.TrafficLayer();
      trafficLayer.setMap(this.$refs.gmap.$mapObject);
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsRenderer = new this.google.maps.DirectionsRenderer();
      this.setGoogleClass(this.google);
    });
  },
  methods: {
    ...mapActions([
      "setCenter",
      "setMyLocation",
      "setGoogleClass",
      "setDirection",
      "setDirectionsRenderer",
      "setInfoWindow",
      "closeInfoWindow",
      "selectRoute"
    ]),
    resetCenterToMyLocation: function() {
      this.$refs.gmap.$mapObject.setCenter(this.myLocation.location);
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
            // console.log(response);
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
            this.setDirection(response);
            this.setDirectionsRenderer(this.directionsRenderer);
            this.selectRoute({ response: response, index: 0 });
          }
        }
      );
    },
    cleanRoute: function() {
      this.directionsRenderer.setPanel(null);
      this.directionsRenderer.setMap(null);
      this.setDirectionsRenderer(null);
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
.v-btn {
  bottom: 10%;
  right: 0.5%;
  background-color: #4169e1;
  color: white;
  position: absolute;
  z-index: 1;
}
</style>

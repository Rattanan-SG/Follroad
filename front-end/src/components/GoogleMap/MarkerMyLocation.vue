<template>
  <div>
    <gmap-marker
      v-if="myLocation"
      :position="myLocation.location"
      :title="myLocation.title"
      @click="toggleInfoWindow()"
    ></gmap-marker>
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    ></gmap-info-window>
  </div>
</template>

<script>
export default {
  name: "MarkerMyLocation",
  props: {
    myLocation: Object
  },
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    toggleInfoWindow: function() {
      const { location, title } = this.myLocation;
      this.infoWindowPos = location;
      this.infoOptions.content = title;
      this.infoWinOpen = !this.infoWinOpen;
    }
  }
};
</script>
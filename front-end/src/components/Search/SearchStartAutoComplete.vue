<template>
  <v-layout row mb-3>
    <v-flex xs1 ml-3>
      <v-btn
        icon
        small
        flat
        @click="setStartToMyLocation"
        :class="[isMyLocationActive ? 'is-active' : null]"
      >
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs8 ml-2 pl-3>
      <gmap-autocomplete
        @place_changed="setStartPlace"
        ref="startAutoComplete"
        placeholder="จุดเริ่มต้น"
        class="pl-2"
        style="background-color: #E0E0E0; width:100%; height:100%"
        :select-first-on-enter="true"
      ></gmap-autocomplete>
    </v-flex>
    <v-flex xs1 mr-2>
      <v-btn icon small flat color="red" @click="resetStartLocation" v-if="startLocation">
        <v-icon>close</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchStartAutoComplete",
  data() {
    return {
      isMyLocationActive: false
    };
  },
  mounted() {
    this.setStartToMyLocation();
  },
  computed: {
    ...mapGetters("googleMap", ["myLocation"]),
    ...mapGetters("direction", ["startLocation"])
  },
  methods: {
    ...mapActions("direction", ["setStartLocation"]),
    setStartToMyLocation: function() {
      if (this.myLocation) {
        this.isMyLocationActive = true;
        this.$refs.startAutoComplete.$el.value = this.myLocation.name;
        this.setStartLocation(this.myLocation.location);
      }
    },
    setStartPlace: function(place) {
      if (place) {
        if (place.geometry) {
          this.isMyLocationActive = false;
          this.$refs.startAutoComplete.$el.value = place.name;
          this.setStartLocation(place.geometry.location);
        }
      }
    },
    resetStartLocation: function() {
      this.isMyLocationActive = false;
      this.$refs.startAutoComplete.$el.value = null;
      this.setStartLocation(null);
    }
  }
};
</script>
<style scoped>
.is-active {
  color: #4169e1;
}
</style>
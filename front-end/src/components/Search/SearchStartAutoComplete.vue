<template>
  <v-layout row my-3>
    <v-flex xs1 ml-3>
      <v-btn
        icon
        small
        flat
        @click="setStartToMyLocation"
        :class="[isMyLocationActive ? 'is-active' : null]"
        :disabled="!!historyMode"
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
        :disabled="!!historyMode"
      ></gmap-autocomplete>
    </v-flex>
    <v-flex xs1 mr-2>
      <v-btn
        icon
        small
        flat
        color="red"
        @click="resetStartLocation"
        v-if="!historyMode && startLocation"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchStartAutoComplete",
  props: {
    historyMode: Object
  },
  data() {
    return {
      isMyLocationActive: false
    };
  },
  computed: {
    ...mapGetters("googleMap", ["myLocation"]),
    ...mapGetters("direction", ["startLocation"])
  },
  mounted() {
    if (this.historyMode || this.startLocation) {
      this.$refs.startAutoComplete.$el.value = this.startLocation.name;
    } else {
      if (this.myLocation) {
        this.setStartToMyLocation();
      } else {
        this.setMyLocation().then(() => {
          this.setStartToMyLocation();
        });
      }
    }
  },
  watch: {
    startLocation(value) {
      if (!value) {
        this.isMyLocationActive = false;
        this.$refs.startAutoComplete.$el.value = null;
      }
    }
  },
  methods: {
    ...mapActions("googleMap", ["setMyLocation"]),
    ...mapActions("direction", ["setStartLocation"]),
    setStartToMyLocation: function() {
      if (this.myLocation) {
        this.isMyLocationActive = true;
        this.$refs.startAutoComplete.$el.value = this.myLocation.name;
        this.setStartLocation(this.myLocation);
      }
    },
    setStartPlace: function(place) {
      if (place) {
        if (place.geometry) {
          this.isMyLocationActive = false;
          this.$refs.startAutoComplete.$el.value = place.name;
          this.setStartLocation({
            name: place.name,
            location: place.geometry.location
          });
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
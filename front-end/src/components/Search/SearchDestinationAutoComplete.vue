<template>
  <v-layout row mb-3>
    <v-flex xs1 ml-3>
      <v-btn icon small flat>
        <v-icon>place</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs8 ml-2 pl-3>
      <gmap-autocomplete
        @place_changed="setDestinationPlace"
        ref="destinationAutoComplete"
        placeholder="จุดหมาย"
        class="pl-2"
        style="background-color: #E0E0E0; width:100%; height:100%"
        :select-first-on-enter="true"
      ></gmap-autocomplete>
    </v-flex>
    <v-flex xs1 mr-2>
      <v-btn icon small flat color="red" @click="resetDestinationPlace" v-if="searchPlace">
        <v-icon>close</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchDestinationAutoComplete",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("search", ["searchPlace"]),
    ...mapGetters("direction", ["startPlace"])
  },
  mounted() {
    this.syncDestinationPlace();
  },
  watch: {
    searchPlace(value) {
      if (value) this.syncDestinationPlace();
    }
  },
  methods: {
    ...mapActions("search", ["setSearchPlace"]),
    syncDestinationPlace: function() {
      if (this.searchPlace) {
        this.$refs.destinationAutoComplete.$el.value = this.searchPlace.name;
        this.destinationLocation = this.searchPlace.geometry.location;
      }
    },
    setDestinationPlace: function(place) {
      if (place) {
        if (place.geometry) {
          this.setSearchPlace(place);
        }
      }
    },
    resetDestinationPlace: function() {
      this.$refs.destinationAutoComplete.$el.value = null;
      this.setSearchPlace(null);
    }
  }
};
</script>
<style scoped>
.is-active {
  color: #4169e1;
}
</style>
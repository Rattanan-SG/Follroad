<template>
  <v-layout row my-3>
    <v-flex xs1 ml-3>
      <v-btn icon small flat :disabled="!!historyMode">
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
        :disabled="!!historyMode"
      ></gmap-autocomplete>
    </v-flex>
    <v-flex xs1 mr-2>
      <v-btn
        icon
        small
        flat
        color="red"
        @click="resetDestinationPlace"
        v-if="!historyMode && searchPlace"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchDestinationAutoComplete",
  props: {
    historyMode: Object
  },
  computed: {
    ...mapGetters("search", ["searchPlace"]),
    ...mapGetters("direction", ["destinationLocation"])
  },
  watch: {
    searchPlace(value) {
      if (value) this.syncDestinationPlace();
      else this.$refs.destinationAutoComplete.$el.value = null;
    }
  },
  mounted() {
    if (this.historyMode && this.destinationLocation) {
      this.$refs.destinationAutoComplete.$el.value = this.destinationLocation.name;
    } else this.syncDestinationPlace();
  },
  methods: {
    ...mapActions("search", ["setSearchPlace"]),
    ...mapActions("direction", ["setDestinationLocation"]),
    syncDestinationPlace: function() {
      if (this.searchPlace) {
        this.$refs.destinationAutoComplete.$el.value = this.searchPlace.name;
        this.setDestinationLocation({
          name: this.searchPlace.name,
          location: this.searchPlace.geometry.location
        });
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
      this.setDestinationLocation(null);
    }
  }
};
</script>
<style scoped>
.is-active {
  color: #4169e1;
}
</style>
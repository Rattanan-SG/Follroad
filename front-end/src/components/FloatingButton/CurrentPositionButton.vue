<template>
  <v-btn
    dark
    fab
    small
    class="currentPositionButton"
    id="currentPositionbtn"
    aria-label="currentPositionbtn"
    color="blue"
    @click="resetCenterToMyLocation()"
  >
    <v-icon>gps_fixed</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CurrentPositionButton",
  methods: {
    ...mapActions("googleMap", ["resetCenterToMyLocation"])
  }
};
</script>
<style scoped>
.currentPositionButton {
  bottom: 7%;
  right: 0%;
  position: absolute;
  z-index: 1;
}
</style>
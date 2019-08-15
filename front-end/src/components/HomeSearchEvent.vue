<template>
  <div>
    <v-layout>
      <v-flex xs2 pt-2 class="hidden-sm-and-up" pl-3>
        <v-btn flat icon @click="toggleRouterView()">
          <v-icon large>keyboard_arrow_left</v-icon>
          <h3>แผนที่</h3>
        </v-btn>
      </v-flex>
      <!-- <v-flex xs9 lg12 sm12>
        <v-text-field label="ค้นหาเหตุการณ์"></v-text-field>
      </v-flex>-->
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "myLocation",
      "searchPlace",
      "showRouterView",
      "directionsRenderer"
    ])
  },
  methods: {
    ...mapActions(["setShowRouterView"]),
    toggleRouterView: function(route) {
      if (this.activeRouter == route) {
        this.setShowRouterView(!this.showRouterView);
      } else {
        this.activeRouter = route;
        this.setShowRouterView(true);
      }
    }
  }
};
</script>
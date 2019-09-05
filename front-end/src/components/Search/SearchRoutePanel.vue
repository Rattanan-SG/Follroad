<template>
  <!-- <div id="panel" ref="panel"></div> -->
  <!-- <p>{{direction.routes[0].legs[0].distance.text}}</p>--->
  <div id="panel" ref="panel">
    <div v-for="(route, index) in direction.routes" :key="index">
      <!-- <p>{{route.summary}}</p> -->

      <!-- <v-list></v-list> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchRoutePanel",
  props: { directionsRenderer: Object },
  data() {
    return {
      trDocument: null
    };
  },
  computed: {
    ...mapGetters("direction", ["direction"])
  },
  mounted() {
    if (this.directionsRenderer) {
      console.log(this.direction.routes[0].legs[0].distance.text);

      this.directionsRenderer.setPanel(this.$refs.panel);
      setTimeout(() => {
        this.setupPanel();
      }, 1000);
    }
  },
  methods: {
    ...mapActions("direction", ["selectRoute"]),
    ...mapActions("route", ["setRouterView"]),
    setupPanel: function() {
      this.trDocument = this.$refs.panel.children[0].querySelectorAll(
        "tr[jsinstance]"
      );
      this.trDocument.forEach(element => {
        element.addEventListener("click", this.changeRouteIndex);
      });
    },
    destroyPanel: function() {
      this.trDocument.forEach(element => {
        element.removeEventListener("click", this.changeRouteIndex);
      });
    },
    changeRouteIndex: function(event) {
      let found = event.path.find(element => {
        return element.tagName == "TD";
      });
      this.selectRoute({
        response: this.direction,
        index: found.attributes[0].value
      });
      // this.directionsRenderer.setOptions({
      //   polylineOptions: { strokeColor: "#8b0013" }
      // });
      // if (this.$vuetify.breakpoint.xsOnly) {
      //   this.setRouterView(false);
      // }
      // console.log(found.attributes[0].value);
    }
  },
  beforeDestroy() {
    this.destroyPanel();
  }
};
</script>
<style scoped>
#panel {
  line-height: 30px;
  height: 45vh;
  overflow: auto;
}
</style>

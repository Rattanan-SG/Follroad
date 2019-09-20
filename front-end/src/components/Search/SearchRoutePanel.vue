<template>
  <div id="panel" ref="panel"></div>
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
    ...mapGetters("direction", ["directionsResponse"])
  },
  mounted() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setPanel(this.$refs.panel);
      setTimeout(() => {
        this.setupPanel();
      }, 1500);
    }
  },
  methods: {
    ...mapActions("direction", ["selectRoute"]),
    ...mapActions("route", ["setRouterView"]),
    setupPanel: function() {
      if (this.$refs.panel)
        this.trDocument = this.$refs.panel.children[0].querySelectorAll(
          "tr[jsinstance]"
        );
      if (this.trDocument)
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
      this.selectRoute(found.attributes[0].value);
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
    if (this.trDocument) this.destroyPanel();
  }
};
</script>
<style scoped>
#panel {
  line-height: 30px;
  max-height: 26vh;
  overflow: auto;
}
</style>

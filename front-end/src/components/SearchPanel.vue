<template>
  <div id="panel" ref="panel"></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SearchPanel",
  props: { directionsRenderer: Object },
  data() {
    return {
      trDocument: null
    };
  },
  computed: {
    ...mapGetters(["direction"])
  },
  mounted() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setPanel(this.$refs.panel);
      setTimeout(() => {
        this.setupPanel();
      }, 1000);
    }
  },
  methods: {
    ...mapActions(["selectRoute", "setShowRouterView"]),
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
      // if (this.$vuetify.breakpoint.xsOnly) {
      //   this.setShowRouterView(false);
      // }
      console.log(found.attributes[0].value);
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
  height: 600px;
  overflow: auto;
}
</style>

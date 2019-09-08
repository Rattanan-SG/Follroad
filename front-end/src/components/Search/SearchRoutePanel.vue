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
    }
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

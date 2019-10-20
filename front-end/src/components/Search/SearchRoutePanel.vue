<template>
  <div>
    <v-flex xs12 lg12 md12 sm12>
      <v-card class="mx-auto" color="#26c6da" flat>
        <div class="white--text pa-2">รายละเอียดและเหตุการณ์ที่เกี่ยวข้องกับเส้นทาง</div>
      </v-card>
    </v-flex>
    <v-card flat v-if="specificEvents">
      <div>
        <v-list two-line>
          <template v-for="(event, index) in specificEvents">
            <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
          </template>
        </v-list>
      </div>
      <div id="panel" ref="panel"></div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HomeFeedItem from "../Home/HomeFeedItem";
export default {
  name: "SearchRoutePanel",
  components: {
    HomeFeedItem
  },
  props: { directionsRenderer: Object },
  data() {
    return {
      trDocument: null
    };
  },
  computed: {
    ...mapGetters("direction", ["directionsResponse"]),
    ...mapGetters("direction", ["specificEvents"])
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
.v-card {
  line-height: 30px;
  max-height: 50vh;
  overflow: auto;
}
</style>

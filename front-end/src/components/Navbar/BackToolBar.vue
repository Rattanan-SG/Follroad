<template>
  <v-card-title>
    <div class="title">
      <v-btn icon @click="closeRouterView">
        <v-icon>close</v-icon>
      </v-btn>
      {{title}}
    </div>
  </v-card-title>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "BackToolBar",
  props: {
    title: String
  },
  computed: {},
  methods: {
    ...mapActions("route", ["setRouterView"]),
    closeRouterView: function() {
      this.setRouterView(false);
    }
  }
};
</script>
<style scoped>
</style>

<template>
  <v-app id="inspire">
    <div>
      <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
        <v-tab ripple>News</v-tab>
        <v-tab ripple>Search</v-tab>
      </v-tabs>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "HomeMenuTab",
  methods: {
    next: function() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>

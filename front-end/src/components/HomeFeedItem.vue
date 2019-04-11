<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>{{event.title}}</v-list-tile-title>
      <v-list-tile-sub-title>{{event.start}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<style>
</style>

<script>
export default {
  name: "HomeFeedItem",
  props: {
    event: Object
  }
};
</script>
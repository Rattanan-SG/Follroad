<template>
  <div>
    <v-toolbar
      absolute
      flat
      dark
      scroll-off-screen
      color="blue-grey darken-2"
      scroll-target="#scrolling-techniques"
      height="35%"
    >
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeInfoWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card flat max-width="100%" class="mx-auto pt-4">
      <v-layout>
        <v-flex xs12 md12 lg12>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{marker.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-text>
            <div>{{marker.description}}</div>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "InfoWindowSearchPlace",
  props: {
    marker: Object,
    closeInfoWindow: Function
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>

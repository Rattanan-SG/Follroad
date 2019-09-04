<template>
  <div>
    <v-toolbar
      absolute
      color="blue-grey darken-2"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      height="40%"
    >
      <v-flex lg12 xs12>
        <v-btn icon dark @click="closeInfoWindow">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
    </v-toolbar>

    <v-card max-width="100%" class="mx-auto" flat>
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

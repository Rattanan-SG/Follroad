<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list two-line>
          <template>
            <v-list-tile :key="event.eid" avatar ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{event.title}}</v-list-tile-title>
                <!-- <v-list-tile-sub-title class="text--primary">{{event.description}}</v-list-tile-sub-title> -->
                <v-list-tile-sub-title>{{event.start}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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
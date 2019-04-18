<template>
  <v-dialog v-model="dialog" scrollable max-width="40%" max-height="100%">
    <template v-slot:activator="{ on }">
      <div id="category-btn">
        <v-btn color="blue-grey" class="white--text" v-on="on">Category</v-btn>
      </div>
    </template>
    <v-card flat>
      <!-- <v-card-title>EventCategory</v-card-title>
      <v-divider></v-divider>-->
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6 v-for="item in checkbox" :key="item.type">
              <v-checkbox v-model="selected" :value="item.value" :label="item.value"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ScrollableDialog",
  data() {
    return {
      dialog: false,
      checkbox: [
        { value: "brokencar", type: "1" },
        { value: "construction", type: "2" },
        { value: "accident", type: "3" },
        { value: "rain", type: "5" },
        { value: "flood", type: "6" },
        { value: "demonstration", type: "7" },
        { value: "information", type: "8" },
        { value: "checkpoint", type: "9" },
        { value: "trafficjam", type: "10" },
        { value: "miscellaneous", type: "11" },
        { value: "warning", type: "12" },
        { value: "event", type: "13" },
        { value: "sale", type: "14" },
        { value: "fire", type: "15" }
      ]
    };
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.eventCategorySelected;
      },
      set(value) {
        this.$store.commit("SET_EVENTCATEGORYSELECTED", value);
      }
    }
  }
};
</script>
<style>
#category-btn {
  margin-top: 2%;
}
</style>
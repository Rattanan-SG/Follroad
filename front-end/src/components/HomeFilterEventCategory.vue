<template>
  <v-dialog v-model="dialog" scrollable max-width="50%" max-height="100%">
    <template v-slot:activator="{ on }">
      <v-layout row>
        <v-flex xs2 lg2>
          <v-btn color="blue-grey" class="white--text" v-on="on">หมวดหมู่</v-btn>
        </v-flex>
      </v-layout>
    </template>
    <v-card flat>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs2 lg2 md3></v-flex>
          <v-flex xs2 lg8 md6></v-flex>
          <v-flex xs2 lg2 md2>
            <v-btn outline flat ripple @click="dialog = false">
              <i class="material-icons">close</i>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 lg6 md6 v-for="item in checkbox" :key="item.type">
            <v-checkbox v-model="selected" :value="item.value" :label="item.value"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout row wrap>
          <v-flex xs6 lg10 md10></v-flex>
          <v-flex xs6 lg2 md2>
            <v-btn color="blue darken-1" flat @click="dialog = false">RESET</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "HomeFilterEventCategory",
  data() {
    return {
      dialog: false,
      checkbox: [
        { value: "carbreakdown", type: "1" },
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
<style scoped>
</style>
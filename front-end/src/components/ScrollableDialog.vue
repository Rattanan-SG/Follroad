<template>
  <v-dialog v-model="dialog" scrollable max-width="40%" max-height="100%">
    <template v-slot:activator="{ on }">
      <v-btn flat color="black" dark v-on="on">Category</v-btn>
    </template>
    <v-card flat>
      <!-- <v-card-title>EventCategory</v-card-title>
      <v-divider></v-divider>-->
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <v-radio-group column>
                <v-checkbox value="Brokencar" label="BrokenCar"></v-checkbox>
                <v-checkbox value="Construction" label="Construction"></v-checkbox>
                <v-checkbox value="Accident" label="Accident"></v-checkbox>
                <v-checkbox value="Rain" label="Rain"></v-checkbox>
                <v-checkbox value="Flood" label="Flood"></v-checkbox>
                <v-checkbox value="Demonstration" label="Demonstration"></v-checkbox>
                <v-checkbox value="Information" label="Information"></v-checkbox>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-radio-group column>
                <v-checkbox value="Checkpoint" label="Checkpoint"></v-checkbox>
                <v-checkbox value="Trafficjam" label="Trafficjam"></v-checkbox>
                <v-checkbox value="Miscellaneous" label="Miscellaneous"></v-checkbox>
                <v-checkbox value="Warning" label="Warning"></v-checkbox>
                <v-checkbox value="Event" label="Event"></v-checkbox>
                <v-checkbox value="Sale" label="Sale"></v-checkbox>
                <v-checkbox value="Fire" label="Fire"></v-checkbox>
              </v-radio-group>
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
      dialog: false
    };
  }
};
</script>
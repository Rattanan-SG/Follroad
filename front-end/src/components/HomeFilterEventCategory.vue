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
          <v-flex xs12 lg6 md6 v-for="(item, index) in checkbox" :key="index">
            <v-checkbox v-model="selected" :value="item" :label="item"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout row wrap>
          <v-flex xs6 lg10 md10></v-flex>
          <v-flex xs6 lg2 md2>
            <v-btn color="blue darken-1" flat @click="reset">RESET</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { EVENT_CATEGORY } from "@/utilitys/eventService";
export default {
  name: "HomeFilterEventCategory",
  data() {
    return {
      dialog: false,
      checkbox: EVENT_CATEGORY
    };
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.event.eventCategorySelected;
      },
      set(value) {
        this.$store.commit("SET_EVENTCATEGORYSELECTED", value);
      }
    }
  },
  methods: {
    reset: function() {
      this.$store.commit("SET_EVENTCATEGORYSELECTED", EVENT_CATEGORY);
    }
  }
};
</script>
<style scoped>
</style>
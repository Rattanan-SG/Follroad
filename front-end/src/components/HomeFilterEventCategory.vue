<template>
  <v-dialog v-model="dialog" scrollable max-width="50%" max-height="100%">
    <template v-slot:activator="{ on }">
      <v-btn color="blue-grey" class="white--text" v-on="on">หมวดหมู่</v-btn>
    </template>
    <v-card>
      <v-card-title>เลือกหมวดหมู่ที่ต้องการแสดง</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 500px;">
        <v-layout row wrap>
          <v-flex xl6 lg6 md6 sm12 xs12 v-for="(item, index) in checkbox" :key="index">
            <v-checkbox v-model="selected" :value="item" :label="item"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout row wrap>
          <v-flex xl2 lg2 md2 sm3 xs6>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          </v-flex>
          <v-flex xl2 lg2 md2 sm3 xs6>
            <v-btn color="blue darken-1" flat @click="reset">Reset</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventService from "@/utilitys/eventService";
export default {
  name: "HomeFilterEventCategory",
  data() {
    return {
      dialog: false,
      checkbox: eventService.EVENT_CATEGORY
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
      this.$store.commit(
        "SET_EVENTCATEGORYSELECTED",
        eventService.EVENT_CATEGORY
      );
    }
  }
};
</script>
<style scoped>
</style>
<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn round depressed color="primary" dark v-on="on">
        <v-icon class="mr-2">category</v-icon>หมวดหมู่
      </v-btn>
    </template>
    <v-card height="500px">
      <v-toolbar color="blue" dark flat>
        <v-icon>category</v-icon>
        <v-toolbar-title>เลือกหมวดหมู่ที่ต้องการแสดง</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xl6 lg6 md6 sm12 xs12 v-for="(item, index) in checkbox" :key="index.type">
            <v-checkbox v-model="selected" :value="item.value" :label="item.label" color="orange"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout row justify-end>
          <v-btn color="green darken-1" flat @click="reset">รีเซ็ต</v-btn>
          <v-btn color="red darken-1" flat @click="dialog = false">ปิด</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventConstant from "@/utilitys/eventConstant";
export default {
  name: "HomeFilterEventCategory",
  data() {
    return {
      dialog: false,
      checkbox: eventConstant.EVENT_CATEGORY_OBJECT
    };
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.event.eventCategorySelected;
      },
      set(value) {
        this.$store.commit("event/SET_EVENT_CATEGORY_SELECTED", value);
      }
    }
  },
  methods: {
    reset: function() {
      this.$store.commit(
        "event/SET_EVENT_CATEGORY_SELECTED",
        eventConstant.EVENT_CATEGORY
      );
    }
  }
};
</script>
<template>
  <v-layout row justify-center>
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-toolbar color="blue" dark flat>
          <v-icon>info</v-icon>
          <v-toolbar-title>{{confirmDialogOption.text}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <!-- <v-icon color="blue">info</v-icon> -->
          คุณต้องการ{{confirmDialogOption.text}}ใช่หรือไม่ ?
        </v-card-text>
        <!-- <v-divider></v-divider> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline color="red" flat @click="confirmDialog = false"><v-icon>close</v-icon>ยกเลิก</v-btn>
          <v-btn outline color="green darken-1" flat @click="submit" :loading="confirmLoading"><v-icon>check</v-icon>ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ConfirmDialog",
  data() {
    return {
      confirmLoading: false
    };
  },
  computed: {
    confirmDialog: {
      get() {
        return this.$store.state.globalFeedback.confirmDialog;
      },
      set(value) {
        this.$store.commit("globalFeedback/SET_CONFIRM_DIALOG", value);
      }
    },
    ...mapGetters("globalFeedback", ["confirmDialogOption"])
  },
  methods: {
    submit: async function() {
      this.confirmLoading = true;
      const { id, submitActions } = this.confirmDialogOption;
      if (submitActions) await submitActions(id);
      this.confirmLoading = false;
      this.confirmDialog = false;
    }
  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="cancelActions" max-width="400">
      <v-card>
        <v-card-text class="title">
          <v-icon color="blue">info</v-icon>
          <span>คุณต้องการ {{confirmText}} ใช่หรือไม่</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click="cancelActions">ยกเลิก</v-btn>
          <v-btn color="green darken-1" flat @click="submitActions" :loading="confirmLoading">ตกลง</v-btn>
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
      if (this.confirmDialogOption.submitActions)
        await this.confirmDialogOption.submitActions();
      this.confirmDialog = false;
    }
  }
};
</script>

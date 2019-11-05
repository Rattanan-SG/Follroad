<template>
  <v-layout row justify-center>
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-toolbar color="orange darken-4" dark flat>
          <v-icon>info</v-icon>
          <v-toolbar-title>{{ confirmDialogOption.text }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>คุณต้องการ{{ confirmDialogOption.text }}ใช่หรือไม่ ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click="confirmDialog = false">ยกเลิก</v-btn>
          <v-btn color="green darken-1" flat @click="submit" :loading="confirmLoading">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapActions("globalFeedback", ["openMessageSnackbar"]),
    submit: async function() {
      this.confirmLoading = true;
      const { submitActions } = this.confirmDialogOption;
      try {
        if (submitActions) await submitActions();
      } catch {
        this.openMessageSnackbar({
          text: `ดำเนินการไม่สำเร็จ โปรดลองใหม่อีกครั้งในภายหลัง`,
          color: "error"
        });
      } finally {
        this.confirmLoading = false;
        this.confirmDialog = false;
      }
    }
  }
};
</script>

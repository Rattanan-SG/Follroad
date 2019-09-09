<template>
  <v-layout row justify-center>
    <v-dialog v-model="loginDialog" max-width="400">
      <v-card>
        <v-card-title class="title justify-center">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="loginDialog = false">ยกเลิก</v-btn>
          <v-btn color="green darken-1" flat @click="login" :loading="loginLoading">เข้าสู่ระบบ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "LoginDialog",
  data() {
    return {
      loginLoading: false
    };
  },
  computed: {
    loginDialog: {
      get() {
        return this.$store.state.globalDialog.loginDialog;
      },
      set(value) {
        this.$store.commit("globalDialog/SET_LOGIN_DIALOG", value);
      }
    }
  },
  methods: {
    login() {
      this.loginLoading = true;
      this.$auth.login({ target: this.$route.path });
    }
  }
};
</script>

<style>
</style>
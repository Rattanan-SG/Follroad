<template>
  <v-layout row justify-center>
    <v-dialog v-model="loginDialog" max-width="400">
      <v-card dark>
        <v-card-text class="title">
          <v-icon color="blue">info</v-icon>
          <span>กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click="loginDialog = false">ยกเลิก</v-btn>
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
        return this.$store.state.globalFeedback.loginDialog;
      },
      set(value) {
        this.$store.commit("globalFeedback/SET_LOGIN_DIALOG", value);
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

<template>
<v-layout row justify-center>
    <v-dialog v-model="loginDialog" max-width="400">
        <v-card>
            <v-toolbar color="blue" dark flat>
                <v-icon>lock</v-icon>
                <v-toolbar-title>กรุณาเข้าสู่ระบบ</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                หากต้องการจะใช้งานความสามารถนี้ในส่วนนี้ต้องเข้าสู่ระบบก่อน
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn outline color="red" flat @click="loginDialog = false">
                    <v-icon>close</v-icon>ยกเลิก
                </v-btn>
                <v-btn outline color="green darken-1" flat @click="login" :loading="loginLoading">
                    <v-icon>check</v-icon>เข้าสู่ระบบ
                </v-btn>
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
            this.$auth.login({
                target: this.$route.path
            });
        }
    }
};
</script>

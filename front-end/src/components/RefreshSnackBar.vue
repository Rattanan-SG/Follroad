<template>
  <v-snackbar v-model="snackWithButtons" :timeout="timeout" multi-line bottom right>
    {{ snackWithBtnText }}
    <v-btn dark flat color="#00f500" @click.native="refreshApp">{{ snackBtnText }}</v-btn>
    <v-btn icon flat @click="snackWithButtons = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "RefreshSnackBar",
  data() {
    return {
      refreshing: false,
      registration: null,
      snackBtnText: "",
      snackWithBtnText: "",
      snackWithButtons: false,
      timeout: 0
    };
  },
  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(event) {
      this.registration = event.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  }
};
</script>
<style scoped>
</style>

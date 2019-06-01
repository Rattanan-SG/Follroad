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
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(event) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = event.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
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

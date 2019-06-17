<template>
  <div>
    <v-btn :disabled="btnDisabled" @click="handleClick">{{btnText}}</v-btn>
    <p>{{message}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notification",
  data() {
    return {
      message: "dfd",
      btnDisabled: true,
      btnText: "Enable Push Messaging",
      isSubscribed: false
    };
  },
  computed: {
    ...mapGetters(["swRegistration"])
  },
  created() {
    this.initialSubscription();
  },
  methods: {
    initialSubscription() {
      this.swRegistration.pushManager.getSubscription().then(subscription => {
        this.isSubscribed = !(subscription === null);
        this.updateSubscriptionOnServer(subscription);
        if (this.isSubscribed) {
          console.log("User IS subscribed.");
        } else {
          console.log("User is NOT subscribed.");
        }
        this.updateBtn();
      });
    },

    handleClick() {
      this.btnDisabled = true;
      if (this.isSubscribed) {
        this.unsubscribeUser();
      } else {
        this.subscribeUser();
      }
    },

    updateBtn() {
      if (Notification.permission === "denied") {
        this.btnText = "Push Messaging Blocked.";
        this.btnDisabled = true;
        this.updateSubscriptionOnServer(null);
        return;
      }
      if (this.isSubscribed) {
        this.btnText = "Disable Push Messaging";
      } else {
        this.btnText = "Enable Push Messaging";
      }
      this.btnDisabled = false;
    },

    urlB64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },

    subscribeUser() {
      const applicationServerKey = this.urlB64ToUint8Array(
        "BAw9J-zAdzrLEUH8tzEX7WMMxXRRsBurDAyyTsT3K7lIo9Tgcw7JMPmUo077RABEi9olT8L1A2Ao-bviY9CVCUs"
      );
      this.swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(subscription => {
          console.log("User is subscribed.");
          console.log(subscription.options);
          this.updateSubscriptionOnServer(subscription);
          this.isSubscribed = true;
          this.updateBtn();
        })
        .catch(err => {
          console.log("Failed to subscribe the user: ", err);
          this.updateBtn();
        });
    },

    unsubscribeUser() {
      this.swRegistration.pushManager
        .getSubscription()
        .then(subscription => {
          if (subscription) {
            return subscription.unsubscribe();
          }
        })
        .catch(error => {
          console.log("Error unsubscribing", error);
        })
        .then(() => {
          this.updateSubscriptionOnServer(null);
          console.log("User is unsubscribed.");
          this.isSubscribed = false;
          this.updateBtn();
        });
    },

    updateSubscriptionOnServer(subscription) {
      // TODO: Send subscription to application server
      if (subscription) {
        this.message = JSON.stringify(subscription);
      } else {
        this.message = "";
      }
    }
  }
};
</script>

<style>
</style>

<template>
  <div>
    <v-btn :disabled="btnDisabled" @click="handleClick">{{btnText}}</v-btn>
    <p>{{isSubscribed}}</p>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import urlB64ToUint8Array from "../utilitys/urlB64ToUint8Array";

export default {
  name: "Notification",
  data() {
    return {
      profile: this.$auth.profile,
      btnDisabled: true,
      btnText: "Enable Push Messaging",
      isSubscribed: false
    };
  },
  computed: {
    ...mapGetters(["swRegistration"])
  },
  watch: {
    swRegistration(newValue, oldValue) {
      if (newValue) {
        this.checkSubscribed();
      }
    }
  },
  mounted() {
    if (this.swRegistration) {
      this.checkSubscribed();
    }
  },
  methods: {
    checkSubscribed() {
      this.swRegistration.pushManager.getSubscription().then(subscription => {
        this.isSubscribed = !(subscription === null);
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
        return;
      }
      if (this.isSubscribed) {
        this.btnText = "Disable Push Messaging";
      } else {
        this.btnText = "Enable Push Messaging";
      }
      this.btnDisabled = false;
    },

    async subscribeUser() {
      const applicationServerKey = urlB64ToUint8Array(
        "BPv9dLtGAEzGDoR8mIDTZGjPa1nYt_CnU3hkQpLzRyRD62F-CeWrp9AEUfzZ7mB6T_mrbrYktByJQW5djr5q2Hk"
      );
      try {
        const subscription = await this.swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        });
        const uid = this.profile && this.profile.sub;
        const subscribe = subscription.toJSON();
        const body = { ...subscribe, uid };
        const response = await axios.post(
          "http://localhost:3002/notification/api/subscription",
          body
        );
        this.isSubscribed = true;
        this.updateBtn();
      } catch (err) {
        this.unsubscribeUser();
        console.log("Failed to subscribe");
      }
    },

    async unsubscribeUser() {
      try {
        const subscription = await this.swRegistration.pushManager.getSubscription();
        if (subscription) {
          subscription.unsubscribe().then(async () => {
            const subscribe = subscription.toJSON();
            const response = await axios.delete(
              "http://localhost:3002/notification/api/subscription",
              { data: subscribe }
            );
            this.isSubscribed = false;
            this.updateBtn();
          });
        }
      } catch (err) {
        console.log("Failed to unsubscribe");
      }
    }
  }
};
</script>

<style>
</style>

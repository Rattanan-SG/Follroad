<template>
  <div>
    <v-subheader>เมนู</v-subheader>
    <!-- <v-layout> -->
    <v-flex xs12 lg12 md12>
      <v-list-tile avatar ripple to="/historyroute">
        <v-list-tile-avatar>
          <v-icon size="25px" class="orange white--text">save</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>เส้นทางที่บันทึก</v-list-tile-content>
        <v-spacer />
        <v-icon>navigate_next</v-icon>
      </v-list-tile>
    </v-flex>
    <!-- </v-layout> -->

    <!-- <v-divider></v-divider> -->
    <!-- <v-layout> -->
    <v-flex xs12 lg12 md12>
      <v-list-tile avatar ripple :disabled="btnDisabled" @click="handleClick">
        <v-list-tile-avatar>
          <v-icon size="25px" class="blue white--text">settings</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>{{btnText}}</v-list-tile-content>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-switch v-model="tempSwitch1"></v-switch>
      </v-list-tile>
    </v-flex>
    <!-- </v-layout> -->
    <!-- <v-divider></v-divider> -->
    <!-- <v-layout> -->
    <v-flex xs12 lg12 md12>
      <v-list-tile avatar ripple @click="logout">
        <v-list-tile-avatar>
          <v-icon size="25px" class="red white--text">lock_open</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>ออกจากระบบ</v-list-tile-content>
        <v-spacer />
        <v-icon>navigate_next</v-icon>
      </v-list-tile>
    </v-flex>
    <!-- </v-layout> -->
  </div>
  <!-- <v-divider></v-divider> -->
</template>

<script>
import axios from "axios";
import urlB64ToUint8Array from "@/utilitys/urlB64ToUint8Array";
export default {
  name: "HomeProfile",
  data() {
    return {
      profile: this.$auth.profile,
      registration: null,
      isSubscribed: false,
      btnDisabled: true,
      btnText: "รับการแจ้งเตือน",
      tempSwitch1: false
    };
  },
  async created() {
    try {
      const registration = await navigator.serviceWorker.ready;
      this.registration = registration;
      const subscription = await registration.pushManager.getSubscription();
      this.isSubscribed = !(subscription === null);
      if (this.isSubscribed) {
        await this.syncSubscription(subscription);
      }
      this.updateBtn();
    } catch (err) {
      console.log("Service Worker not ready");
    }
  },
  methods: {
    logout() {
      this.$auth.logOut();
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
        this.btnText = "ไม่อนุญาตรับการแจ้งเตือน";
        this.btnDisabled = true;
        return;
      }
      if (this.isSubscribed) {
        this.btnText = "ปิดรับการแจ้งเตือน";
      } else {
        this.btnText = "เปิดรับการแจ้งเตือน";
      }
      this.btnDisabled = false;
    },

    async syncSubscription(subscription) {
      const uid = this.profile && this.profile.sub;
      const subscribe = subscription.toJSON();
      const body = { ...subscribe, uid };
      await axios.put(
        `${process.env.VUE_APP_NOTIFICATION_URL}/subscription`,
        body
      );
    },

    async subscribeUser() {
      const applicationServerKey = urlB64ToUint8Array(
        process.env.VUE_APP_WEB_PUSH_KEY
      );
      try {
        const subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        });
        const uid = this.profile && this.profile.sub;
        const subscribe = subscription.toJSON();
        const body = { ...subscribe, uid };
        await axios.post(
          `${process.env.VUE_APP_NOTIFICATION_URL}/subscription`,
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
        const subscription = await this.registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          const subscribe = subscription.toJSON();
          await axios.delete(
            `${process.env.VUE_APP_NOTIFICATION_URL}/subscription`,
            { data: subscribe }
          );
          this.isSubscribed = false;
          this.updateBtn();
        }
      } catch (err) {
        console.log("Failed to unsubscribe");
      }
    }
  }
};
</script>

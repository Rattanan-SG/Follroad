<template>
  <div>
    <v-subheader>เมนู</v-subheader>
    <v-layout row wrap>
      <v-flex xs12 lg12 md12>
        <v-list-tile avatar ripple to="/myevent">
          <v-list-tile-avatar>
            <v-icon size="25px" class="green white--text">room</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>เหตุการณ์ของฉัน</v-list-tile-content>
          <v-list-tile-action>
            <v-icon>navigate_next</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-flex>
      <v-flex xs12 lg12 md12>
        <v-list-tile avatar ripple to="/historyroute">
          <v-list-tile-avatar>
            <v-icon size="25px" class="orange white--text">save</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>เส้นทางที่บันทึกของฉัน</v-list-tile-content>
          <v-list-tile-action>
            <v-icon>navigate_next</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-flex>

      <v-flex xs12 lg12 md12>
        <v-list-tile avatar ripple :disabled="notificationDisabled" @click="handleSubscribe">
          <v-list-tile-avatar>
            <v-icon size="25px" class="blue white--text">settings</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>{{ notificationText }}</v-list-tile-content>
          <v-list-tile-action style="margin-right: -15px;">
            <v-switch :value="isSubscribed"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </v-flex>

      <v-flex xs12 lg12 md12>
        <v-list-tile avatar ripple @click="logout">
          <v-list-tile-avatar>
            <v-icon size="25px" class="red white--text">lock_open</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>ออกจากระบบ</v-list-tile-content>
          <v-list-tile-action>
            <v-icon>navigate_next</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import notificationApi from "@/api/notification";
import urlB64ToUint8Array from "@/utilitys/urlB64ToUint8Array";
export default {
  name: "ProfileMenu",
  data() {
    return {
      registration: null,
      notificationDisabled: true,
      notificationText: "อุปกรณ์ไม่รองรับการแจ้งเตือน",
      isSubscribed: false
    };
  },
  async created() {
    try {
      const registration = await navigator.serviceWorker.ready;
      this.registration = registration;
      const subscription = await registration.pushManager.getSubscription();
      this.isSubscribed = !(subscription === null);
      this.updateNoti();
      if (this.isSubscribed) {
        await this.syncSubscription(subscription);
      } else if (Notification.permission === "granted") {
        await this.subscribeUser();
      }
    } catch (err) {
      console.log("Service Worker not ready");
    }
  },
  methods: {
    handleSubscribe() {
      this.notificationDisabled = true;
      if (this.isSubscribed) {
        this.unsubscribeUser();
      } else {
        this.subscribeUser();
      }
    },
    updateNoti() {
      if (Notification.permission === "denied") {
        this.notificationText = "คุณไม่อนุญาตรับการแจ้งเตือน";
        this.notificationDisabled = true;
        return;
      } else {
        this.notificationText = "รับการแจ้งเตือน";
        this.notificationDisabled = false;
      }
    },
    async syncSubscription(subscription) {
      const { sub: uid } = this.$auth.user;
      const subscribe = subscription.toJSON();
      const body = { ...subscribe, uid };
      await notificationApi.putSubscription(body);
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
        const { sub: uid } = this.$auth.user;
        const subscribe = subscription.toJSON();
        const body = { ...subscribe, uid };
        await notificationApi.postSubscription(body);
        this.isSubscribed = true;
        this.updateNoti();
      } catch (err) {
        this.unsubscribeUser();
        console.warn("Failed to subscribe");
      }
    },
    async unsubscribeUser() {
      try {
        const subscription = await this.registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          const subscribe = subscription.toJSON();
          await notificationApi.deleteSubscription({ data: subscribe });
          this.isSubscribed = false;
          this.updateNoti();
        }
      } catch (err) {
        console.warn("Failed to unsubscribe");
      }
    },
    logout() {
      this.unsubscribeUser();
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
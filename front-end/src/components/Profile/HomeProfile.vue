<template>
  <v-container v-if="profile">
    <v-list>
      <v-layout grid-list-md text-xs-center>
        <v-flex xs1>
          <!-- <div>
          <v-icon large>keyboard_arrow_left</v-icon>
          </div>-->
        </v-flex>
        <v-flex xs10>
          <v-avatar size="80px">
            <img :src="profile.picture" alt="avatar" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-layout grid-list-md text-xs-center>
        <v-flex xs12>
          <h2 class="Name">{{profile.name}}</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 grid-list-md text-xs-center>
          <h4 class="e-mail">{{profile.email}}</h4>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12 lg12 mt-5>
          <v-list-tile avatar ripple to="/historyroute">
            <v-list-tile-action>
              <v-icon size="35px" color="orange">save</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h4>เส้นทางที่บันทึก</h4>
            </v-list-tile-content>
            <v-spacer />
            <v-icon>navigate_next</v-icon>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex xs12 lg12>
          <v-list-tile avatar ripple :disabled="btnDisabled" @click="handleClick">
            <v-list-tile-action>
              <v-icon size="35px" color="indigo">settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h4>{{btnText}}</h4>
            </v-list-tile-content>
            <v-spacer />
            <v-icon>navigate_next</v-icon>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex xs12 lg12>
          <v-list-tile avatar ripple @click="logout">
            <v-list-tile-action>
              <v-icon size="35px" color="indigo">logout</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h4>ออกจากระบบ</h4>
            </v-list-tile-content>
            <v-spacer />
            <v-icon>navigate_next</v-icon>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-list>
  </v-container>
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
      btnText: "กรุณาเปิดรับการแจ้งเตือน"
    };
  },
  async created() {
    try {
      const registration = await navigator.serviceWorker.ready;
      this.registration = registration;
      const subscription = await registration.pushManager.getSubscription();
      this.isSubscribed = !(subscription === null);
      if (this.isSubscribed) {
        this.syncSubscription(subscription);
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
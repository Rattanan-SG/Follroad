<template>
  <div>
    <LoadingCircular :loading="loading" />
    <v-list v-if="!loading && !!myEvents.length" two-line class="main-list">
      <template v-for="(event, index) in myEvents">
        <v-list-tile
          :key="index"
          avatar
          :to="{ path: `/details/${event.id}` }"
          @click="setRouterView(true)"
        >
          <v-list-tile-avatar tile>
            <v-img :src="getEventIcon(event)" max-width="25" max-height="25" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="blue--text text--darken-2 font-weight-bold">{{ event.title }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="isEventEnd(event.stop)">เหตุการณ์นี้สิ้นสุดไปแล้ว</v-list-tile-sub-title>
            <v-list-tile-sub-title v-else>เวลาสิ้นสุด {{ event.stop | luxon:locale('short') }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-menu bottom left offset-y transition="slide-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.prevent>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-tile
                  v-for="(menu, i) in menus"
                  :key="i"
                  ripple
                  @click="menu.click(index, event.id)"
                >
                  <v-list-tile-title>
                    <v-icon class="mr-2">{{ menu.icon }}</v-icon>
                    {{ menu.title }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="`d${index}`"></v-divider>
      </template>
    </v-list>

    <div v-if="!loading && !myEvents.length">
      <v-flex xs12 lg12 md12 pa-2>
        <v-card class="mx-auto" color="cyan darken-3" dark flat>
          <v-card-title>
            <v-flex xs2 lg2 md2>
              <v-icon medium left>info</v-icon>
            </v-flex>
            <v-flex xs10 lg10 md10>
              <h3 class="font-weight-light">ไม่มีประวัติการแจ้งเหตุการณ์</h3>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </div>

    <EditEventDialog v-model="showEditEventDialog" :eventId="editEventId" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import eventApi from "@/api/event";
import eventConstant from "@/utilitys/eventConstant";
import LoadingCircular from "../Feedback/LoadingCircular";
import EditEventDialog from "./EditEventDialog";
export default {
  name: "MyEventList",
  components: {
    LoadingCircular,
    EditEventDialog
  },
  data() {
    return {
      loading: true,
      myEvents: null,
      menus: [
        {
          title: "แก้ไข",
          icon: "edit",
          click: (index, eventId) => this.openEditEventDialog(eventId)
        },
        {
          title: "ลบ",
          icon: "delete",
          click: (index, eventId) => this.deleteMyEventById(index, eventId)
        }
      ],
      showEditEventDialog: false,
      editEventId: null
    };
  },
  computed: {
    ...mapGetters("directionRecord", ["directionRecords"])
  },
  async created() {
    if (this.$auth.user) {
      this.loading = true;
      this.myEvents = await eventApi.getUserEventByUid(this.$auth.user.sub, {
        fields: "id title description start stop type",
        withPictures: true
      });
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("globalFeedback", ["openConfirmDialog"]),
    ...mapActions("event", ["deleteEventById"]),

    openEditEventDialog: function(eventId) {
      this.showEditEventDialog = true;
      this.editEventId = eventId;
    },
    deleteMyEventById: function(index, eventId) {
      this.openConfirmDialog({
        text: `ลบเหตุการณ์นี้`,
        submitActions: () => this.handleDeleteMyEventById(index, eventId)
      });
    },
    handleDeleteMyEventById: async function(index, eventId) {
      await eventApi.deleteEventById(eventId);
      this.myEvents.splice(index, 1);
      this.deleteEventById(eventId);
    },
    getEventIcon: function(event) {
      return eventConstant.selectIcon(event);
    },
    isEventEnd: function(stop) {
      const now = new Date();
      const stopDate = new Date(stop);
      return stopDate < now;
    }
  }
};
</script>
<style scoped>
.main-list {
  height: 70vh;
  overflow: auto;
}
</style>
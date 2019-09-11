<template>
  <div>
    <v-layout>
      <v-flex xs6 lg6 md6>
        <v-btn flat to="/profile">
          <v-icon blue>arrow_back_ios</v-icon>โปรไฟล์
        </v-btn>
      </v-flex>
      <v-flex xs10 lg10 md10 mt-2>
        <h3>เส้นทางที่บันทึก</h3>
      </v-flex>
    </v-layout>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-list v-if="directionRecords" three-line>
      <template v-for="(record, index) in directionRecords">
        <v-list-tile class="mt-1" :key="index" avatar ripple @click="startHistoryRoute(record)">
          <v-list-tile-content>
            <v-list-tile-title>{{ record.name }}</v-list-tile-title>
            <v-list-tile-sub-title
              class="text--primary"
            >จาก {{ record.start.name }} --> {{ record.destination.name }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>แก้ไข้ล่าสุด ณ {{ formatUpdatedAt(record.updatedAt) }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="`d${index}`"></v-divider>
      </template>
    </v-list>
    <div v-else>ไม่มีๆๆๆๆๆๆๆๆๆๆๆ</div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HistoryRouteList",
  data() {
    return {
      uid: null,
      loading: true
    };
  },
  computed: {
    ...mapGetters("directionRecord", ["directionRecords"])
  },
  watch: {
    uid(value) {
      if (value)
        this.fetchDirectionRecordsByUid(this.uid).then(() => {
          this.loading = false;
        });
    }
  },
  created() {
    if (this.$auth.profile)
      this.fetchDirectionRecordsByUid(this.$auth.profile.sub).then(() => {
        this.loading = false;
      });
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("directionRecord", ["fetchDirectionRecordsByUid"]),
    ...mapActions("direction", [
      "setStartLocation",
      "setDestinationLocation",
      "setDirectionsResponse",
      "startDirectionsRenderer"
    ]),

    startHistoryRoute: function(record) {
      this.$router.push({
        name: "search",
        params: { historyMode: true, recordId: record._id }
      });
      this.$vuetify.breakpoint.xsOnly
        ? this.setRouterView(false)
        : this.setRouterView(true);
      this.setStartLocation(record.start);
      this.setDestinationLocation(record.destination);
      this.setDirectionsResponse(record.direction);
      this.startDirectionsRenderer();
    },
    formatUpdatedAt: function(updatedAt) {
      return DateTime.fromISO(updatedAt).toFormat("yyyy-MM-dd HH:mm:ss");
    },
    handleLoginEvent(data) {
      this.uid = data.profile.sub;
    }
  }
};
</script>
<style scoped>
.v-list {
  height: 70vh;
  overflow: auto;
}
</style>
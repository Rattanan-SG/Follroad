<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-list v-if="!!directionRecords.length" three-line>
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
    <div v-if="!loading && !directionRecords.length">
      <p>user นี้ไม่เคยมีการบันทึก ไปหาไรมาใส่ให้ด้วยนะ</p>
    </div>
  </div>
</template>
<script>
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
    ...mapActions("directionRecord", [
      "fetchDirectionRecordsByUid",
      "setHistoryMode"
    ]),
    ...mapActions("direction", [
      "setStartLocation",
      "setDestinationLocation",
      "setDirectionsResponse",
      "startDirectionsRenderer"
    ]),

    startHistoryRoute: function(record) {
      this.setHistoryMode({ recordId: record._id });
      this.$router.push("/search");
      this.$vuetify.breakpoint.xsOnly
        ? this.setRouterView(false)
        : this.setRouterView(true);
      this.setStartLocation(record.start);
      this.setDestinationLocation(record.destination);
      this.setDirectionsResponse(record.direction);
      this.startDirectionsRenderer();
    },
    formatUpdatedAt: function(updatedAt) {
      return new Date(updatedAt).toLocaleString("en-GB");
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
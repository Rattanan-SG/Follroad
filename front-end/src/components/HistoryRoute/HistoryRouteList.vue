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
      <v-flex xs12 lg12 md12 pa-2>
        <v-card class="mx-auto" color="#26c6da" dark flat>
          <v-card-title>
            <v-flex xs2 lg2 md2>
              <v-icon medium left>info</v-icon>
            </v-flex>
            <v-flex xs10 lg10 md10>
              <h3 class="font-weight-light">ไม่มีประวัติการบันทึกเส้นทาง</h3>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <!-- <v-list two-line>
        <template>
          <v-divider></v-divider>
          <v-layout>
            <v-flex mt-3 ml-3 xs1 md1 lg1>
              <v-icon size="40px">home</v-icon>
            </v-flex>
            <v-flex ml-1 xs9 md9 lg9>
              <v-list-tile>
                <v-list-tile-content>
                  <h4>บ้านไปมอ</h4>
                  <v-list-tile-sub-title
                    class="text--primary"
                  >จากตำแหน่งปัจจุบัน ไป เซ็นทรัลพลาซา พระราม 2</v-list-tile-sub-title>
                  <v-list-tile-sub-title>แก้ไขล่าสุด ณ 13/09/2019, 10:13:16</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>

          <v-layout>
            <v-flex mt-3 ml-3 xs1 md1 lg1>
              <v-icon size="40px">home</v-icon>
            </v-flex>
            <v-flex ml-1 xs9 md9 lg9>
              <v-list-tile>
                <v-list-tile-content>
                  <h4>บ้านไปมอ</h4>
                  <v-list-tile-sub-title
                    class="text--primary"
                  >จากตำแหน่งปัจจุบัน ไป เซ็นทรัลพลาซา พระราม 2</v-list-tile-sub-title>
                  <v-list-tile-sub-title>แก้ไขล่าสุด ณ 13/09/2019, 10:13:16</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </template>
      </v-list>-->
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
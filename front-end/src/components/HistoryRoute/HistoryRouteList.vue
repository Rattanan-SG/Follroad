<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="100" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>

    <!-- ต้นฉบับ จะแสดงเมื่อ user เคยมีบันทึกเส้นทางไว้ -->
    <v-list v-if="!loading && !!directionRecords.length" three-line>
      <template v-for="(record, index) in directionRecords">
        <v-list-tile class="mt-1" :key="index" avatar ripple @click="startHistoryRoute(record)">
          <v-flex mb-1 mr-2 xs1 md1 lg1>
            <v-card-actions>
              <v-btn flat icon color="red lighten-1">
                <v-icon size="35px">place</v-icon>
              </v-btn>
            </v-card-actions>
          </v-flex>
          <v-flex ml-4 xs8 md7 lg8>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-black">{{ record.name }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">
                จาก {{ record.start.name }}
                <v-icon size="20px">arrow_right_alt</v-icon>
                {{ record.destination.name }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>แก้ไขล่าสุดเมื่อ {{ record.updatedAt | luxon:locale('shortS') }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-flex>

          <v-flex ml-2 xs1 md1 lg1>
            <v-card-actions>
              <v-btn flat icon color="grey" @click.stop="deleteHistoryRoute(record._id)">
                <v-icon size="30px">delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-list-tile>

        <v-divider :key="`d${index}`"></v-divider>
      </template>
    </v-list>

    <!-- ตรงนี้จะแสดงเมื่อ user ไม่มีเส้นทางที่บันทึก -->
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
    async uid(value) {
      if (value) {
        await this.fetchDirectionRecordsByUid(this.uid);
        this.loading = false;
      }
    }
  },
  async created() {
    if (this.$auth.profile) {
      await this.fetchDirectionRecordsByUid(this.$auth.profile.sub);
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("directionRecord", [
      "fetchDirectionRecordsByUid",
      "deleteDirectionRecordById",
      "setHistoryMode"
    ]),
    ...mapActions("direction", [
      "setStartLocation",
      "setDestinationLocation",
      "setDirectionsResponse",
      "startDirectionsRenderer"
    ]),
    ...mapActions("globalFeedback", ["openConfirmDialog"]),

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
    deleteHistoryRoute: function(_id) {
      this.openConfirmDialog({
        _id,
        text: `ลบบันทึกเส้นทางนี้`,
        submitActions: () => this.handleDeleteHistoryRoute(_id)
      });
    },
    handleDeleteHistoryRoute: async function(_id) {
      const accessToken = await this.$auth.getAccessToken();
      return this.deleteDirectionRecordById({
        _id,
        config: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      });
    },
    handleLoginEvent: function(data) {
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
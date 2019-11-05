<template>
  <div>
    <LoadingCircular :loading="loading" />
    <v-list v-if="!loading && !!directionRecords.length" three-line>
      <template v-for="(record, index) in directionRecords">
        <v-list-tile :key="index" avatar ripple @click="startHistoryRoute(record._id)">
          <v-flex xs11 md10 lg10 sm10>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-black">
                <v-icon size="20px" color="red">place</v-icon>
                {{ record.name }}
              </v-list-tile-title>
              <v-list-tile-sub-title class="caption black--text">
                {{ record.start.name }}
                <v-icon size="20px">arrow_right_alt</v-icon>
                {{ record.destination.name }}
              </v-list-tile-sub-title>
              <v-list-tile-title
                class="caption grey--text"
              >แก้ไขล่าสุด {{ record.updatedAt | luxon:locale('shortS') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex>
          <v-flex xs1 md1 lg1 sm1>
            <v-btn flat icon color="grey" @click.stop="deleteHistoryRouteById(record._id)">
              <v-icon size="30px">delete</v-icon>
            </v-btn>
          </v-flex>
        </v-list-tile>
        <v-divider :key="`d${index}`"></v-divider>
      </template>
    </v-list>

    <div v-if="!loading && !directionRecords.length">
      <v-flex xs12 lg12 md12 pa-2>
        <v-card class="mx-auto" color="cyan darken-3" dark flat>
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
import LoadingCircular from "../Feedback/LoadingCircular";
export default {
  name: "HistoryRouteList",
  components: {
    LoadingCircular
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters("directionRecord", [
      "directionRecords",
      "directionRecordById"
    ])
  },
  async created() {
    if (this.$auth.user) {
      await this.fetchDirectionRecordsByUid(this.$auth.user.sub);
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("route", ["setRouterView"]),
    ...mapActions("directionRecord", [
      "fetchDirectionRecordsByUid",
      "fetchDirectionByRecordId",
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

    startHistoryRoute: async function(_id) {
      this.loading = true;
      await this.fetchDirectionByRecordId(_id);
      this.setHistoryMode({ recordId: _id });
      const { start, destination, direction } = this.directionRecordById(_id);
      this.$router.push("/search");
      this.$vuetify.breakpoint.xsOnly
        ? this.setRouterView(false)
        : this.setRouterView(true);
      this.setStartLocation(start);
      this.setDestinationLocation(destination);
      this.setDirectionsResponse(direction);
      this.startDirectionsRenderer();
    },
    deleteHistoryRouteById: function(_id) {
      this.openConfirmDialog({
        text: `ลบเส้นทางที่บันทึกนี้`,
        submitActions: () => this.handleDeleteHistoryRouteById(_id)
      });
    },
    handleDeleteHistoryRouteById: function(_id) {
      return this.deleteDirectionRecordById({ _id });
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
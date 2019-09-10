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

    <v-list v-if="directionRecords">
      <v-layout>
        <v-flex xs12 lg12 mt-5>
          <v-list-tile avatar ripple>
            <v-list-tile-action>
              <v-icon size="35px" color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>Home --- KMUTT</h3>
              <v-list-tile-sub-title>CCC</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex xs12 lg12 mt-0>
          <v-list-tile avatar ripple>
            <v-list-tile-action>
              <v-icon size="35px" color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>Home --- KMUTT</h3>
              <v-list-tile-sub-title>CCC</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex xs12 lg12 mt-0>
          <v-list-tile avatar ripple>
            <v-list-tile-action>
              <v-icon size="35px" color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>Home --- KMUTT</h3>
              <v-list-tile-sub-title>CCC</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-list>
    <div v-else>ไม่มีๆๆๆๆๆๆๆๆๆๆๆ</div>
    <!-- </v-list> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HistoryRouteList",
  data() {
    return {
      uid: null
    };
  },
  computed: {
    ...mapGetters("directionRecord", ["directionRecords"])
  },
  watch: {
    uid(value) {
      if (value) {
        this.fetchDirectionRecordsByUid(this.uid);
      }
    }
  },
  created() {
    console.log(99999);

    if (this.uid) this.fetchDirectionRecordsByUid(this.uid);
  },
  methods: {
    ...mapActions("directionRecord", ["fetchDirectionRecordsByUid"]),
    handleLoginEvent(data) {
      this.uid = data.profile.sub;
    }
  }
};
</script>
<style scoped>
</style>

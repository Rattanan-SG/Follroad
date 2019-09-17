<template>
    <div>
        <v-layout row justify-center class="hidden-sm-and-up" >
            <v-flex xs12 lg12 md12 class="ToggleSpecificEvent">
                <v-btn round color="blue" dark @click.stop="dialog = true">เหตุการณ์ที่เกี่ยวข้อง</v-btn>
            </v-flex>
            <v-dialog v-model="dialog" max-width="290" v-if="specificEvents">
                <v-card>
                <!-- <v-toolbar color="blue" dark flat>
                    <v-icon>feed</v-icon>
                    <v-toolbar-title>เหตุการณ์ที่เกี่ยวข้องกับเส้นทาง</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar> -->
                <div class="specificEvent">
                    <v-list two-line>
                        <template v-for="(event, index) in specificEvents">
                        <HomeFeedItem :key="index" :event="event"></HomeFeedItem>
                        </template>
                    </v-list>
                </div>
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat="flat" @click="dialog = false">ยกเลิก</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">ตกลง</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import HomeFeedItem from "../Home/HomeFeedItem";
export default {
  name: "ToggleSpecificEvent",
  components: {
    HomeFeedItem
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters("direction", ["specificEvents"])
  }
};
</script>
<style scoped>
.ToggleSpecificEvent {
  bottom: 7%;
  right: 56%;
  position: absolute;
  z-index: 1;
}
.specificEvent {
  padding: 5%;
}
</style>
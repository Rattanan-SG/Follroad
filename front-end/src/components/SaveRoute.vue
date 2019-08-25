<template>
  <div>
    <v-btn text icon @click.stop="dialog=true" v-if="directionsRenderer">
      <v-icon>save</v-icon>
    </v-btn>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-toolbar color="blue" dark flat>
            <v-icon>save</v-icon>
            <v-toolbar-title>บันทึกเส้นทาง</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn text icon @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>-->
          </v-toolbar>
          <v-card-text>
            <!-- <v-container grid-list-md> -->
            <v-layout wrap>
              <v-flex xs1 md1 lg1>
                <v-btn icon small flat>
                  <v-icon>my_location</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs1 md1 lg1></v-flex>
              <v-flex xs10 md10 lg10 mt-2>
                <span>KMUTT</span>
              </v-flex>
              <v-flex xs1 md1 lg1>
                <v-btn icon small>
                  <v-icon>place</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs1 md1 lg1></v-flex>
              <v-flex xs10 md10 lg10 mt-2>
                <span>Siam Paragon</span>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="กรอกชื่อเส้นทางที่บันทึก*" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-card color="#E0E0E0" flat>
                  <div>
                    <h3>เส้นทางที่ต้องการบันทึก</h3>
                    <v-checkbox
                      v-validate="'required'"
                      type="checkbox"
                      required
                      label="ทางพิเศษเฉลิมมหานคร 200km 50 นาที"
                    ></v-checkbox>
                    <v-checkbox
                      v-validate="'required'"
                      type="checkbox"
                      required
                      label="ถนนพระราม 2 ขาออก 50km 37 นาที"
                    ></v-checkbox>
                  </div>
                </v-card>
              </v-flex>
              <v-flex xs12 md12>
                <v-switch v-model="switch1" label="รับการแจ้งเตือนในเส้นทางนี้ ?"></v-switch>
              </v-flex>
              <v-flex xs11 sm11>
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  v-if="switch1"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="กำหนดเวลาการแจ้งเตือน"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>

              <v-spacer></v-spacer>
              <v-flex xs11 sm5>
                <v-dialog
                  ref="dialog"
                  v-model="modal2"
                  :return-value.sync="time"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-time-picker v-if="modal2" v-model="time" full-width>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!-- </v-container> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "saveRoute",
  data() {
    return {
      dialog: false,
      time: null,
      menu2: false,
      modal2: false,
      dialogm1: "",
      switch1: false
    };
  },
  computed: {
    ...mapGetters(["directionsRenderer"])
  }
};
</script>
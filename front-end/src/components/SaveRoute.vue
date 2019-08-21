<template>
  <div>
    <v-btn v-if="directionsRenderer" text icon @click.stop="dialog=true">
      <v-icon>save</v-icon>
    </v-btn>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">บันทึกเส้นทาง</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field label="ชื่อเส้นทางที่บันทึก*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <h4>ต้นทาง :</h4>
                </v-flex>
                <v-flex xs12>
                  <h4>ปลายทาง :</h4>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <h3>รายการเส้นทางที่ต้องการบันทึก</h3>
                </v-flex>
                <v-flex xs12 sm12>
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
                </v-flex>
                <v-flex xs11 sm5>
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
                      <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
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
      modal2: false
    };
  },
  computed: {
    ...mapGetters(["directionsRenderer"])
  }
};
</script>
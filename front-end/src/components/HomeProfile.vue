<template>
  <v-container>
    <v-layout grid-list-md text-xs-center>
      <v-flex xs1>
        <!-- <div>
          <v-icon large>keyboard_arrow_left</v-icon>
        </div>-->
      </v-flex>
      <v-flex xs10>
        <v-btn size="60px" fab>
          <v-icon>person</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout grid-list-md text-xs-center>
      <v-flex xs12>
        <h1 class="Name">Vertical Duke</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 grid-list-md text-xs-center>
        <h4 class="e-mail">vertical.duke@gmail.com</h4>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 lg12 mt-5>
        <v-list-tile avatar ripple to="/historyroute">
          <v-list-tile-action>
            <v-icon size="35px" color="indigo">save</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <h3>เส้นทางที่บันทึก</h3>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>

    <v-divider inset></v-divider>

    <v-layout>
      <v-flex xs12 lg12>
        <v-list-tile avatar ripple to>
          <v-list-tile-action>
            <v-icon size="35px" color="indigo">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <h3>ตั้งค่าการแจ้งเตือน</h3>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>

    <v-divider inset></v-divider>

    <v-layout>
      <v-flex xs12 lg12>
        <v-list-tile avatar ripple to>
          <v-list-tile-action>
            <v-icon size="35px" color="indigo">logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <h3>ออกจากระบบ</h3>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>

    <v-divider inset></v-divider>
  </v-container>
</template>
<script>
export default {
  name: "HomeProfile"
};
</script>
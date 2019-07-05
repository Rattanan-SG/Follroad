<template>
  <v-container>
    <v-layout grid-list-md text-xs-center>
      <v-flex xs1>
        <div>
          <v-icon large>keyboard_arrow_left</v-icon>
        </div>
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
        <v-list dense>
          <v-list-tile @click>
            <v-list-tile-content>
              <h3>ตั้งค่าการแจ้งเตือน</h3>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="historyRoute">
            <v-list-tile-content>
              <h3>ประวัติเส้นทางที่เดินทาง</h3>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click>
            <v-list-tile-content>
              <h3>ชิปกับเดลชิปกับเดลชิปกับเดล</h3>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 lg12 mt-5>
        <v-list dense>
          <v-list-tile to="historyRoute">
            <v-list-tile-content>
              <h3>ชิปกับเดลชิปกับเดลชิปกับเดล</h3>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click>
            <v-list-tile-content>
              <h3>ชิปกับเดลชิปกับเดลชิปกับเดล</h3>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click>
            <v-list-tile-content>
              <h3>ชิปกับเดลชิปกับเดลชิปกับเดล</h3>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
</script>
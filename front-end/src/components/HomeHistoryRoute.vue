<template>
  <v-container>
    <v-layout grid-list-md text-xs-center>
      <v-flex xs1>
        <div>
          <v-btn flat to="/profile">
            <v-icon large>keyboard_arrow_left</v-icon>
          </v-btn>
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
        <v-list-tile :key="index" avatar ripple>
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
    <v-divider inset></v-divider>
    <v-layout>
      <v-flex xs12 lg12 mt-0>
        <v-list-tile :key="index" avatar ripple>
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
    <v-divider inset></v-divider>
    <v-layout>
      <v-flex xs12 lg12 mt-0>
        <v-list-tile :key="index" avatar ripple>
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
  </v-container>
</template>

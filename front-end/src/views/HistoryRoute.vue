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
            <v-list-tile-action>
              <v-icon size="35px" color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h1>KMUTT to Central</h1>
              <!-- <v-list-tile-sub-title>Personal</v-list-tile-sub-title> -->
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-list two-line subheader>
        <v-subheader inset>Folders</v-subheader>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>location_on</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>SSSS</v-list-tile-title>
            <v-list-tile-sub-title>CCC</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-subheader inset>Files</v-subheader>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>location_on</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>KMUTT</v-list-tile-title>
            <v-list-tile-sub-title>AAA</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-layout>
  </v-container>
</template>
<script>
</script>
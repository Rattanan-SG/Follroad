<template>
  <div>
    <v-layout row wrap>
      <v-flex xs2 md1 pt-3>
        <v-icon>my_location</v-icon>
      </v-flex>
      <v-flex xs10 md11 pl-3>
        <gmap-autocomplete style="background-color: white; width:100%;height:120%"></gmap-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs2 md1 pt-3>
        <v-icon>place</v-icon>
      </v-flex>
      <v-flex xs10 md11 pl-3>
        <gmap-autocomplete style="background-color: white; width:100%;height:120%"></gmap-autocomplete>
      </v-flex>
      <v-flex xs12 md12 px-1>
        <v-layout align-end justify-end fill-height>
          <v-btn color="blue-grey" class="white--text">ค้นหาเส้นทาง</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12>หก</v-flex>
    </v-layout>
  </div>
</template>

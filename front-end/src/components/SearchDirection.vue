<template>
  <div>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs2 md1>
            <v-icon>my_location</v-icon>
          </v-flex>
          <v-flex xs10 md11 pl-3>
            <gmap-autocomplete style="background-color: white; width:100%;"></gmap-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2 md1>
            <v-icon>place</v-icon>
          </v-flex>
          <v-flex xs10 md11 pl-3>
            <gmap-autocomplete style="background-color: white; width:100%"></gmap-autocomplete>
          </v-flex>
          <v-flex xs10 md10 px-1>
            <v-btn color="blue-grey" class="white--text">ค้นหาเส้นทาง</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

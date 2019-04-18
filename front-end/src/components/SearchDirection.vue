<template>
  <div>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs2 md1>
            <v-icon>my_location</v-icon>
          </v-flex>
          <v-flex xs9 md10>
            <gmap-autocomplete></gmap-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2 md1>
            <v-icon>place</v-icon>
          </v-flex>
          <v-flex xs9 md10>
            <gmap-autocomplete></gmap-autocomplete>
          </v-flex>
          <v-flex xs10 md10>
            <div class="text-xs-right">
              <v-btn color="success">SEARCH</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

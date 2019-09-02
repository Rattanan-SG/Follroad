<template>
  <v-card>
    <v-container align-center>
      <v-layout row wrap align-start justify-center fill-height>
        <v-card color="deep-orange lighten-1  black--text " class="mb-4 mt-4">
          <v-layout>
            <!-- <v-flex xs2 md1>
              <br>
              <v-icon size="50px" class="ml-4">account_circle</v-icon>
            </v-flex>-->
            <v-flex>
              <v-card-title primary-title>
                <div>
                  <div id="title" class="ml-1">
                    <h3>{{event.title}}</h3>
                  </div>
                  <div id="abc" class="ml-1">
                    เริ่ม
                    : {{event.start}}
                    <br>
                    สิ้นสุด
                    : {{event.stop}}
                  </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <div id="description">
              {{event.description}}
              <br>
              <v-icon size="40px">account_circle</v-icon>
              by {{event.contributor}}
            </div>
          </v-flex>
          <v-divider light></v-divider>

          <!-- <v-card-actions class="pa-3">
            <v-flex xs2 md1>
              <v-icon size="30px">account_circle</v-icon>
            </v-flex>

            <v-flex xs11>
              <v-card dark color="white black--text">
                <v-card-text>
                  รถติดมาก
                  <div class="text-xs-right">
                    <v-btn round color="light-blue accent-4 white--text" fab>
                      <v-icon>send</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-card-actions>-->
        </v-card>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style scoped>
.abc {
  margin-top: 2px;
}
#description {
  margin-left: 30px;
  margin-right: 30px;
  color: white;
  font-size: 17px;
}
</style>

<script>
export default {
  name: "NewsFeedItem",
  props: {
    event: Object
  }
};
</script>
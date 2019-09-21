<template>
  <v-card flat class="mb-2" color="deep-orange lighten-1 black--text">
    <v-layout row wrap align-start justify-center fill-height>
      <v-layout>
        <v-flex>
          <v-card-title primary-title>
            <div>
              <div id="title" class="ml-1">
                <h3>{{event.title}}</h3>
              </div>
              <div id="abc" class="ml-1 body-1">
                เริ่ม
                : {{ event.start | luxon:locale('short') }}
                <br />
                สิ้นสุด
                : {{ event.stop | luxon:locale('short') }}
              </div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <div id="description">
          {{event.description}}
          <br />
          <v-icon size="40px">account_circle</v-icon>
          by {{event.contributor}}
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "NewsFeedItem",
  props: {
    event: Object
  }
};
</script>
<style scoped>
#description {
  margin-left: 30px;
  margin-right: 30px;
  color: white;
  font-size: 17px;
}
</style>
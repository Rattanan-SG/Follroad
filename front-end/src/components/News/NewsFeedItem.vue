<template>
  <v-card flat class="mb-2">
    <v-layout row wrap align-start justify-center fill-height>
      <v-layout>
        <v-flex xs1 md1 lg1 mt-4 ml-3>
          <v-img :src="getIcon()" max-width="40" max-height="40" left></v-img>
        </v-flex>
        <v-flex xs10 md10 lg10 mt-1 mr-3>
          <!-- <v-list-tile>
            <v-list-tile-avatar>
              <v-img :src="getIcon()" max-width="40" max-height="40" left></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span class="font-weight-light">{{event.title}}</span>
            </v-list-tile-content>
          </v-list-tile>-->
          <v-card-title primary-title>
            <div>
              <h3 class="blue--text">{{event.title}}</h3>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-flex xs12>
        <!-- <div id="description">
          {{event.description}}
        </div>-->
        <v-card-text>{{event.description}}</v-card-text>
        <v-card-title>
          <span class="red--text">
            เกิดขึ้น ณ
            : {{ event.start | luxon:locale('short') }}
            <br />
            จะสิ้นสุดใน
            : {{ event.stop | luxon:locale('short') }}
            <br />
            <v-icon medium>person_pin</v-icon>
            โดย {{event.contributor}}
          </span>
        </v-card-title>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import eventConstant from "@/utilitys/eventConstant";
export default {
  name: "NewsFeedItem",
  props: {
    event: Object
  },
  computed: {
    ...mapGetters("event", ["eventMarkerByEventId"])
  },
  methods: {
    getIcon: function() {
      return eventConstant.selectIcon(this.event);
    }
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
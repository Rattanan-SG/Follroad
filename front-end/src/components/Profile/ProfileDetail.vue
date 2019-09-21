<template>
  <div>
    <v-list>
      <v-layout grid-list-md text-xs-center>
        <v-flex xs12>
          <v-avatar size="80px">
            <img :src="profile.picture" alt="avatar" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-layout grid-list-md text-xs-center>
        <v-flex xs12>
          <h2 class="Name">{{profile.name}}</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 grid-list-md text-xs-center>
          <h4 class="e-mail">{{profile.email}}</h4>
        </v-flex>
      </v-layout>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "ProfileDetail",
  props: {
    profile: {
      type: Object,
      default: function() {
        return {
          name: "กรุณาเข้าสู่ระบบ",
          email: "กรุณาเข้าสู่ระบบ"
        };
      }
    }
  }
};
</script>

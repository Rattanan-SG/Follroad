<template>
  <div>
    <v-subheader>ข้อมูลผู้ใช้</v-subheader>
    <v-list two-line>
      <v-list-tile>
        <v-list-tile-avatar>
          <img :src="profile.picture" alt="avatar" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{profile.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{profile.email}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
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

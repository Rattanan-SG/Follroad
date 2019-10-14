<template>
  <div>
    <CloseViewToolBar title="ข้อมูลส่วนตัว" />
    <ProfileDetail :profile="profile" />
    <ProfileMenu />
  </div>
</template>
<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const ProfileDetail = () => import("@/components/Profile/ProfileDetail");
const ProfileMenu = () => import("@/components/Profile/ProfileMenu");
export default {
  name: "Profile",
  components: {
    CloseViewToolBar,
    ProfileDetail,
    ProfileMenu
  },
  data() {
    return {
      profile: this.$auth.profile
    };
  }
};
</script>
<template>
  <div>
    <CloseViewToolBar title="ข้อมูลส่วนตัว" />
    <ProfileDetail :profile="profile" />
    <HomeProfile />
  </div>
</template>
<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const HomeProfile = () => import("@/components/Profile/HomeProfile");
const ProfileDetail = () => import("@/components/Profile/ProfileDetail");
export default {
  name: "Profile",
  components: {
    CloseViewToolBar,
    ProfileDetail,
    HomeProfile
  },
  data() {
    return {
      profile: this.$auth.profile
    };
  }
};
</script>
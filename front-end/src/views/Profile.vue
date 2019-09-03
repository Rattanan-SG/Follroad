<template>
  <div>
    <BackToolBar title="ข้อมูลส่วนตัว"/>
    <HomeProfile />
  </div>
</template>
<script>
const BackToolBar = () => import("@/components/Navbar/BackToolBar");
const HomeProfile = () => import("@/components/Profile/HomeProfile");
export default {
  name: "Profile",
  components: {
    BackToolBar,
    HomeProfile
  }
};
</script>
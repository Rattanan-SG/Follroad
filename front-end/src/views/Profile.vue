<template>
  <div>
    <CloseViewToolBar title="ข้อมูลส่วนตัว" />
    <HomeProfile />
  </div>
</template>
<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const HomeProfile = () => import("@/components/Profile/HomeProfile");
export default {
  name: "Profile",
  components: {
    CloseViewToolBar,
    HomeProfile
  }
};
</script>
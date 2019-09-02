<template>
  <HomeProfile />
</template>
<script>
const HomeProfile = () => import("../components/Profile/HomeProfile");
export default {
  name: "Profile",
  components: {
    HomeProfile
  }
};
</script>
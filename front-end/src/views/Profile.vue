<template>
  <HomeProfile />
</template>
<script>
const HomeProfile = () => import("../components/HomeProfile");
export default {
  name: "Profile",
  components: {
    HomeProfile
  }
};
</script>
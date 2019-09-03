<template>
  <div>
    <BackToolBar title="เส้นทางที่บันทึก"/>
    <HomeHistoryRoute />
  </div>
</template>
<script>
const BackToolBar = () => import("@/components/Navbar/BackToolBar");
const HomeHistoryRoute = () =>
  import("@/components/HistoryRoute/HomeHistoryRoute");
export default {
  name: "HistoryRoute",
  components: {
    BackToolBar,
    HomeHistoryRoute
  }
};
</script>
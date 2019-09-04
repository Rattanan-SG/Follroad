<template>
  <div>
    <BackToolBar title="เส้นทางที่บันทึก" />
    <HomeHistoryRoute />
  </div>
</template>
<script>
import BackToolBar from "@/components/Navbar/BackToolBar";
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
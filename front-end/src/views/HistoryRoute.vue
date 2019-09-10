<template>
  <div>
    <BackToolBar title="เส้นทางที่บันทึก" />
    <HistoryRouteList />
  </div>
</template>
<script>
import BackToolBar from "@/components/Navbar/BackToolBar";
const HistoryRouteList = () =>
  import("@/components/HistoryRoute/HistoryRouteList");
export default {
  name: "HistoryRoute",
  components: {
    BackToolBar,
    HistoryRouteList
  }
};
</script>
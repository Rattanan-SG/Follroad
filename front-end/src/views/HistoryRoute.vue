<template>
  <div>
    <CloseViewToolBar title="เส้นทางที่บันทึก" leftIcon="arrow_back" :leftAction="goBackToProfile" />
    <HistoryRouteList />
  </div>
</template>
<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const HistoryRouteList = () =>
  import("@/components/HistoryRoute/HistoryRouteList");
export default {
  name: "HistoryRoute",
  components: {
    CloseViewToolBar,
    HistoryRouteList
  },
  methods: {
    goBackToProfile: function() {
      this.$router.push("/profile");
    }
  }
};
</script>
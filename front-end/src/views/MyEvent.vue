<template>
  <div>
    <CloseViewToolBar title="เหตุการณ์ของฉัน" leftIcon="arrow_back" :leftAction="goBackToProfile" />
    <MyEventList />
  </div>
</template>
<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const MyEventList = () => import("@/components/MyEvent/MyEventList");
export default {
  name: "MyEvent",
  components: {
    CloseViewToolBar,
    MyEventList
  },
  methods: {
    goBackToProfile: function() {
      this.$router.push("/profile");
    }
  }
};
</script>
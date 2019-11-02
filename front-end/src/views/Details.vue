<template>
  <div>
    <CloseViewToolBar title="รายละเอียดเหตุการณ์" leftIcon="arrow_back" :leftAction="goBack" />
    <DescriptionEvent />
  </div>
</template>
<script>
import CloseViewToolBar from "@/components/Navbar/CloseViewToolBar";
const DescriptionEvent = () => import("@/components/Details/DescriptionEvent");
export default {
  components: {
    CloseViewToolBar,
    DescriptionEvent
  },
  methods: {
    goBack: function() {
      this.$router.back();
    }
  }
};
</script>

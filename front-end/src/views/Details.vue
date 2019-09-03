<template>
  <div>
    <BackToolBar title="รายละเอียดเหตุการณ์"/>
    <DescriptionEvent />
  </div>
</template>
<script>
const BackToolBar = () => import("@/components/Navbar/BackToolBar");
const DescriptionEvent = () => import("@/components/Details/DescriptionEvent");
export default {
  components: {
    BackToolBar,
    DescriptionEvent
  }
};
</script>

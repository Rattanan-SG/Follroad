<template>
  <div>
    <CloseViewToolBar title="รายละเอียดเหตุการณ์" />

    <v-card flat height="20px"></v-card>
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
  }
};
</script>

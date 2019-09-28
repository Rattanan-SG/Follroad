<template>
  <div>
    <v-card color="blue darken-3" flat>
      <CloseViewToolBar title="รายละเอียดเหตุการณ์" />
    </v-card>
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

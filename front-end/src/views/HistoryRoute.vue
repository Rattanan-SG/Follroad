<template>
  <HomeHistoryRoute />
</template>
<script>
const HomeHistoryRoute = () => import("../components/HistoryRoute/HomeHistoryRoute");
export default {
  name: "HistoryRoute",
  components: {
    HomeHistoryRoute
  }
};
</script>
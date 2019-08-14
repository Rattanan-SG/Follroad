<template>
  <HomeHistoryRoute />
</template>
<script>
const HomeHistoryRoute = () => import("../components/HomeHistoryRoute");
export default {
  name: "HistoryRoute",
  components: {
    HomeHistoryRoute
  }
};
</script>
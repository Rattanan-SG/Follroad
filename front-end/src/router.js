import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profilemobile",
      name: "profilemobile",
      component: () => import("./views/ProfileMobile.vue")
    },
    {
      path: "/details",
      name: "details",
      component: () => import("./views/Details.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () =>
        import(/* webpackChunkName: "search" */ "./views/Search.vue")
    },
    {
      path: "/news",
      name: "news",
      component: () => import(/* webpackChunkName: "news" */ "./views/News.vue")
    },
    {
      path: "/notification",
      name: "notification",
      component: () =>
        import(/* webpackChunkName: "news" */ "./views/Notification.vue")
    },
    {
      path: "/historyroute",
      name: "historyroute",
      component: () => import("./views/HistoryRoute.vue")
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("./components/Callback.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

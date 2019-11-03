import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { authGuard } from "./auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/details/:eventId",
      name: "details",
      component: () =>
        import(/* webpackChunkName: "details" */ "./views/Details.vue"),
      meta: { initRouterView: true }
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
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./views/Profile.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/historyroute",
      name: "historyroute",
      component: () =>
        import(
          /* webpackChunkName: "historyroute" */ "./views/HistoryRoute.vue"
        ),
      beforeEnter: authGuard
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

export default router;

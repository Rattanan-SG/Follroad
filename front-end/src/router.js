import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import auth from "./auth/authService";
import Callback from "./components/Callback";

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
      path: "/details",
      name: "details",
      component: () => import("./views/Details.vue")
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
      meta: { requiresAuth: true }
    },
    {
      path: "/historyroute",
      name: "historyroute",
      component: () => import("./views/HistoryRoute.vue")
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/callback" || auth.isAuthenticated()) {
    return next();
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    auth.login({ target: to.path });
  }
  return next();
});

export default router;

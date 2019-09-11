import Vue from "vue";
import Router from "vue-router";
import auth from "./auth/authService";
import Home from "./views/Home.vue";
import AddEventByUser from "./views/AddEventByUser.vue";
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
      component: () =>
        import(/* webpackChunkName: "details" */ "./views/Details.vue")
    },
    {
      path: "/search",
      name: "search",
      props: true,
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
      component: () =>
        import(
          /* webpackChunkName: "historyroute" */ "./views/HistoryRoute.vue"
        )
    },
    {
      path: "/addeventbyuser",
      name: "addeventbyuser",
      component: AddEventByUser
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
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    auth.login({ target: to.path });
  } else next();
});

export default router;

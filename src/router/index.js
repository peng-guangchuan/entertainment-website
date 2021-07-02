import Vue from "vue";
import VueRouter from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "webhome", component: () => import("../components/webHome/WebHome.vue") },
  { path: "*", component: NotFoundComponent },
  { path: "/login", name: "login", component: () => import("../components/Login.vue") },
  { path: "/registerhome", component: () => import("../components/register/RegisterHome") },
  { path: "/bookhome", name: "bookhome", component: () => import("../components/book/bookhome.vue"), },
  { path: "/bookdetail", name: "bookdetail", component: () => import("../components/book/bookdetail.vue") },
  { path: "/moviehome", name: "moviehome", component: () => import("../components/movie/moviehome.vue") },
  { path: "/moviedetail", name: "moviedetail", component: () => import("../components/movie/moviedetail.vue") },
  { path: "/musichome", name: "musichome", component: () => import("../components/music/musichome.vue") },
  { path: "/musicdetail", name: "musicdetail", component: () => import("../components/music/musicdetail.vue") },
  { path: "/activityhome", name: "activityhome", component: () => import("../components/activityhome/ActivityHome.vue") },
  { path: "/myactivityhome", name: "myactivityhome", component: () => import("../components/activityhome/MyActivityHome.vue") },
  { path: "/activitydetail", name: "activitydetail", component: () => import("../components/activityhome/ActivityDetail.vue") },
  { path: "/adminLogin", name: "adminLogin", component: () => import("../components/admin/adminLogin.vue") },
  { path: "/postactivity", name: "postactivity", component: () => import("../components/activityhome/postEssay.vue") },
  {
    path: "/adminHome", name: "adminHome", component: () => import("../components/admin/BackStageHome.vue"),
    children: [
      { path: "/bookmanger", name: "bookmanger", component: () => import("../components/admin/bookmanger.vue") },
      { path: "/musicmanger", name: "musicmanger", component: () => import("../components/admin/musicmanger.vue") },
      { path: "/moviemanger", name: "moviemanger", component: () => import("../components/admin/moviemanger.vue") },
      { path: "/activitymanger", name: "activitymanger", component: () => import("../components/admin/activitymanger.vue") },
      { path: "/usermanger", name: "usermanger", component: () => import("../components/admin/usermanger.vue") },
    ]
  },
  { path: "/userhome", meta: { requireAuth: true }, component: () => import("../components/userhome/UserHome") },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

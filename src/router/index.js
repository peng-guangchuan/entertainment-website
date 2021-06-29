import Vue from "vue";
import VueRouter from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "forumhome",
    component: () => import("../components/forumHome/ForumHome.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/bookhome",
    name: "bookhome",
    component: () => import("../components/book/bookhome.vue"),
  },
  {
    path: "/bookdetail",
    name: "bookdetail",
    component: () => import("../components/book/bookdetail.vue")
  },
  {
    path: "/moviehome",
    name: "moviehome",
    component: () => import("../components/movie/moviehome.vue")
  },
  {
    path: "/musichome",
    name: "musichome",
    component: () => import("../components/music/musichome.vue")
  },
  {
    path: "/loginbackstage",
    name: "loginbackstage",
    component: () => import("../components/backstagehome/LoginBackStage.vue")
  },

  {
    path: "/backstagehome",
    component: () => import("../components/backstagehome/BackStageHome.vue"),
    children: [
      {
        path: "/usermanger",
        name: "usermanger",
        component: () => import("../components/backstagehome/UserManger.vue")
      },
      {
        path: "/articlemanger",
        name: "articlemanger",
        component: () => import("../components/backstagehome/ArticleManger.vue")
      },
      {
        path: "/typemanger",
        name: "typemanger",
        component: () => import("../components/backstagehome/TypeManger.vue")
      }
    ]
  },
  {
    path: "/userhome",
    meta: { requireAuth: true },
    component: () => import("../components/userhome/UserHome")
  },
  {
    path: "/allarticlehome",
    component: () => import("../components/articlehome/allarticlehome")
  },

  {
    path: "/registerhome",
    component: () => import("../components/register/RegisterHome")
  },

  {
    path: "*", component: NotFoundComponent
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../components/articlehome/Details")
  },
  {
    path: "/postarticle",
    name: "PostArticle",
    component: () => import("../components/articlehome/PostArticle")
  }
  ,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});



export default router;

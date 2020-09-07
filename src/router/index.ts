import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/fieldOperations",
    name: "FieldOperations",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Main.vue"),
    children: [
      {
        path:"/fieldOperations/sort/:sortField",
        name: 'SortedFieldOperations'
      }
    ]
  },
  {
    path: "*/*",
    name: "FieldOperations",
    redirect: "/fieldOperations"
  }
];

const router = new VueRouter({
  routes
});

export default router;

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/field/operations",
    name: "FieldOperations",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Main.vue"),
    children: [
      {
        path: "/field/operations/filter/:filter/sort/:sortField/:sortDirection",
        name: "QueryFieldOperations"
      }
    ]
  },
  {
    path: "/",
    name: "FieldOperations",
    redirect: "/field/operations"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;

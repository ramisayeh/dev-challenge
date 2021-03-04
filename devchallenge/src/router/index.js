import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from '../views/About.vue';
import editProfile from '../views/editProfile.vue';
import firebase from 'firebase';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      meta: {
        authRequired: true,
      },
      // beforeEnter: ((to, from, next) => {
      //   if (to.matched.some((record) => record.meta.authRequired)) {
      //     if (firebase.auth().currentUser) {
      //     } else {
      //       alert("You must be logged in to see this page");
      //       next({
      //         path: "/",
      //       });
      //     }
      //   } else {
      //     next();
      //   }
      // })
},
{
  path: '/editProfile',
  name: 'editProfile',
  component: editProfile
}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes : routes
});
// const app = new Vue({
//   router
// }).$mount('#app')

export default router;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import vuetify from "./plugins/vuetify";
var firebaseConfig = {
  apiKey: "AIzaSyDfuayn7c9EUC0Oh1NUHzXsrYnNcnJqJWg",
  authDomain: "devchallenge-39dfc.firebaseapp.com",
  projectId: "devchallenge-39dfc",
  storageBucket: "devchallenge-39dfc.appspot.com",
  messagingSenderId: "154951800307",
  appId: "1:154951800307:web:89b996d995ac4ccde76e86",
  measurementId: "G-Y32YN5HEF8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
Vue.config.productionTip = false;

new Vue({
  router,
  vuesax,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");


export default firebase;

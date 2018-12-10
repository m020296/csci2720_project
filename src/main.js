import Vue from "vue";
import "./plugins/vuetify";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import VueFirestore from 'vue-firestore';
import VueFire from 'vuefire'
import 'firebase/firestore'
import axios from 'axios'
Vue.use(VueFire)
Vue.use(axios)
var config = {
  apiKey: "AIzaSyBIjnXNtVGp_4K4wBKC4I3bF9uj17n0WfM",
  authDomain: "project2720-eafa3.firebaseapp.com",
  databaseURL: "https://project2720-eafa3.firebaseio.com",
  projectId: "project2720-eafa3",
  storageBucket: "project2720-eafa3.appspot.com",
  messagingSenderId: "359893870297"
};

firebase.initializeApp(config);


Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
let app = "";

firebase
  .auth()
  .onAuthStateChanged(function(user)  {
    if (!app) {
      /* eslint-disable no-new */
      app = new Vue({
        router,
        render: h => h(App)
      }).$mount("#app");
    }
  });

  const Firebase = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  Firebase.settings(settings);
  export const db = Firebase
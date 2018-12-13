import Vue from "vue";
import "./plugins/vuetify";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import VueFirestore from 'vue-firestore';
import VueFire from 'vuefire'
import 'firebase/firestore'
import axios from 'axios'
import VeeValidate from 'vee-validate';
Vue.use(VueFire);
Vue.use(axios);
Vue.use(VeeValidate);

// var config = {
//   apiKey: "AIzaSyBIjnXNtVGp_4K4wBKC4I3bF9uj17n0WfM",
//   authDomain: "project2720-eafa3.firebaseapp.com",
//   databaseURL: "https://project2720-eafa3.firebaseio.com",
//   projectId: "project2720-eafa3",
//   storageBucket: "project2720-eafa3.appspot.com",
//   messagingSenderId: "359893870297"
// };

//backup firebase project
// var config = {
//   apiKey: "AIzaSyA7HGB9WW_UpgfxmSBHtEqJtzLNmIE-SmU",
//   authDomain: "backup-a7bf7.firebaseapp.com",
//   databaseURL: "https://backup-a7bf7.firebaseio.com",
//   projectId: "backup-a7bf7",
//   storageBucket: "backup-a7bf7.appspot.com",
//   messagingSenderId: "857548580000"
// };

//bak2
var config = {
    apiKey: "AIzaSyD10c-E8Gyu6KaBZSwgqVrET4YI_5XjqS8",
    authDomain: "back2-2f39f.firebaseapp.com",
    databaseURL: "https://back2-2f39f.firebaseio.com",
    projectId: "back2-2f39f",
    storageBucket: "back2-2f39f.appspot.com",
    messagingSenderId: "387196796111"
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
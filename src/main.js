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
import admin from 'firebase-admin';

Vue.use(admin);
Vue.use(VueFire);
Vue.use(axios);
Vue.use(VeeValidate);
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "project2720-eafa3",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCJai8o1Mbi0S2h\naxZ3jhwol+3kt8W0Qvn6NtlwkfUYK+jQkLPW3K9nSH5zjqB2oo6ZsWY0zwxpx0/9\nx0DuKicvn5+vd6B0u3mzx1pHQfOUK9SQuW+u3BXfjENxy15dRPQkXxmCqVtsG7gr\ny4Ccgg1iHFAsli7/LZVNPMQwdf8FJFdvVvXm4Obv8eaoXk/LzLBDdPsneFwcWdd9\nnWQeThffqVSNE2YvGAjafjCLDQfhNNROs0Oek6dc1OwayEUS/daMqnql6StsuLwE\nol18/JQfxU7pe3nir8T7YwIiK7syz2L/8BPS/kzIsgHhC8GzLiDKco6Vrdq4CQWR\np+2nb52xAgMBAAECggEABFqZcO1A+fnPvNAUT6hwiva5YmhSOtJucjefrxnozqHB\niC41jIbEhfy9iPLJccjXxNXim6S9y3I1viA8le8++5rOp/Qd4OT5x7D20tArpBO5\ncfZ2K++sP7+FeYsMi97971MWD1ZHX8cHEFgr1ImoW+Xywl7l0U8D7oUQ4Eo00NhY\ni8M6Qjct5nyDWuQ8rS8y7Dcxw1YLP+4FWpl4qZmUTEH5xPd6R7l2Blx5q5uXSgrp\nZKP2mlvA80cIsYd/KxwlNM8KBllnvu2a4vAAGbBYsPanmmhEOnlQTVEBNeTZoS37\ns7XbvqyaqK9uPzJpOfjbDs5FXtwn8ojWdSmnY/GGAQKBgQC+p80MaU3xmTskGl7Y\nDF72fG8+xVRtpFPbjT2SQD1gsmF8wIgOaM6u40t8g80g2FlcUy1tRgtulxGBGDgx\nUnRKQsKU3ueNd8U+82qFXrIL2xmjsw+hpIYC8qKvTBokuqVOZHaDWQgE0Xkgb7SM\nBzQl9o9275KoT4ATPADbjEJ7QQKBgQC4gwVBZjglJxM+KLVdjz1ikHRi4AmZh3ZS\np5iu6FRpR//nN3aJ/O70CAa/m1f0pBv0TvE/5jQakGIWrPrg8h7eN4GXkTOJFKdS\nWA8YFF+RKwviUCRiegMyk6ep02kd5MOVifYGhGXviP6y4xzYDTzbnejdcUaOG8FZ\npZa6n7e2cQKBgQCADRHiQSPxndoj8HY9I2nwoTjSbxS6o0ETV/S/stfGh2iEsodv\nLiOLQOwlUBzI76ZtJQyAtSfeeiZuj0bGkbu7WMV52ZCp6oSXOEQWGbj5z4mT8iMQ\njQDZH//2PuXcP2PhmAYlR/njypFRINWhqwDycnx/BH96/hJmWMm2q6jHQQKBgARr\njxqr+jhZoUph60Zcghn0X/VmbJRy/FCqlyvJgQwsn2LIn1xa5NaPwqmgbRD9RXYq\n1fiz6Reh0de9OR1eb4LfTYl1/wgPqJp+ZY4sHsX5hAVd6iE5zw3NH70fxWrj6hOR\nBIXPcim03HUon65FUunn9IYpioko/Q7Kurupy9rhAoGBAJXRuHayTkG2nz6vmVt4\npMyilLaKUjtjWtqsD4h6YQYoOyQmrKpDhiws/HcwMujiKKyrGSHL3AagArgF3XWL\nzbxtAPqqDpMY7GLou6N0tdE8AuurHut4Fzzvw6xQtJdnke++j5TFPDnD5m3IdfkO\nmb5GdG6LsG/tYO/Nrpdi0ogO\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-xbn8h@project2720-eafa3.iam.gserviceaccount.com"
}),
  databaseURL: 'https://project2720-eafa3.firebaseio.com'
});
export const dbadmin = admin
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
import Vue from 'vue'
import './plugins/vuetify'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'


var config = {

};

firebase.initializeApp(config);

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
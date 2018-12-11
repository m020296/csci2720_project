import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/Signup.vue'
import Welcome from '@/views/Welcome.vue'
import About from '@/views/About.vue'


//admin
import Admin from '@/views/Admin/Admin.vue'
import FlushData from '@/views/Admin/FlushData.vue'
import EventData from '@/views/Admin/EventData.vue'
import UserData from '@/views/Admin/UserData.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'singup',
      component: SignUp
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/flushData',
      name: 'flushData',
      component: FlushData
    },
    {
      path: '/eventData',
      name: 'eventData',
      component: EventData
    },
    {
      path: '/userData',
      name: 'UserData',
      component: UserData
    }


  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // console.log("to-path " + to.name);
  // console.log("requiresAuth : " + requiresAuth);
  // if(currentUser){
  //   console.log("currentUser : " + "true");
  // } else{
  //   console.log("currentUser : " + "null");
  // }
  
  if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next(to.name);
  else next();
});

export default router;

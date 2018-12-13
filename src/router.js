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
import LoadCSV from '@/views/Admin/LoadCSV.vue'

import EventList from '@/components/eventList'
import EventDetails from '@/components/eventDetails'
import FavList from '@/components/favouriteList'

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
      },
      children: [
        {
          path: '/events',
          name: 'eventList',
          component: EventList, 
        },
        {
          path: '/events/:id/:title/:datetime/:organization/:venue/:district',
          name: 'eventDetail',
          component: EventDetails,
          props: true   
        },
        {
          path: '/favs',
          name: "favList",
          component: FavList
        }
      ]
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
    },
    {
      path: '/loadCSV',
      name: 'LoadCSV',
      component: LoadCSV
    },
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
  console.log("currentUser: "+ currentUser.email);
  console.log("requiresAuth: "+ requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next(to.name);
  else next();
});

export default router;

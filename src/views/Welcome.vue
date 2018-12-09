<template>
  <v-app id="inspire" >

 <!-- /* eslint-disable */ -->
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      width="200"
      
    >
      <v-list dense >

        <v-list-tile v-on:click="component = 'eventList'">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="component = 'favList'">
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Favourite</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>


    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left color="light-blue lighten-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>User Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-spacer></v-spacer>
      <v-btn flat disabled id="userInfo">{{text}}</v-btn>
      <v-btn @click="logout" color="primary">Logout</v-btn>
      
    </v-toolbar>
      
    <v-content>
      <v-container fluid fill-height>
        <component v-bind:is="component"></component>
      </v-container>
    </v-content>
  
  </v-app>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase';
import eventList from './../components/eventList.vue';
import favList from './../components/favouriteList.vue';

export default {
  components: {
    'eventList': eventList,
    'favList': favList
  },
  data: () => ({
    drawer: null,
    text: 'Diu',
    component: 'eventList'
  }),
  props: {
    source: String
  },
  created(){
    console.log("test");
    console.log(this.text);
    this.text =" fuck"
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
  
  
};
</script>

<style>
#userInfo{
  color: black !important;
  text-transform: none !important;
}
</style>

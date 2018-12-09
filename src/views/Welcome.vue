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

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
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
        <v-layout justify-center align-center>
          <v-flex shrink>


            <!-- <v-tooltip right>
              <v-btn
                slot="activator"
                :href="source"
                icon
                large
                target="_blank"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>


            <v-tooltip right>
              <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/qxQWda" target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip> -->

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  
  </v-app>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase';

export default {
  data: () => ({
    drawer: null,
    text: 'Diu'
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

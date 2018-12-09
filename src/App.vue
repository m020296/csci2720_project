<template>
  <div id="app">
    <v-toolbar dense fixed>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-title>CSCI 2720 Project</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/about">About</v-btn>
        <v-btn flat to="/login">Login</v-btn>
        <v-btn flat to="/signup">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <br>
    <br>
    <br>
    <main padding-top>
      <router-view v-model="routeView"/>
    </main>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      routeView: ""
    };
  },
  methods: {}
};

firebase.auth().onAuthStateChanged(() => {
  // console.log("firebase login logout");
  if (user) {
    console.log("Sign ed in");
  } else {
    console.log("Sign ed out");
  }
});
</script>
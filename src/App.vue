<template>
  <div id="app">
    <v-toolbar dense fixed>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-title>CSCI 2720 Project</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/about">About</v-btn>
        <v-btn id="loginBtn" flat to="/login">Login</v-btn>
        <v-btn id="SignupBtn" flat to="/signup">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <br>
    <br>
    <br>
    <main padding-top>
      <router-view @click="test"/>
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
  methods: {
    test: function() {
      console.log("test");
      firebase
        .auth()
        .onAuthStateChanged()
        .then(
          (user) => {
            console.log("Sign ed in");
            console.log(this.$refs.loginBtn);
          },
          (err) => {
            console.log(this.$refs.loginBtn);
            console.log("Sign ed out");
          }
        );
    }
  }
};
</script>
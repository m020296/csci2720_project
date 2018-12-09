<template>
  <div id="app">
    <v-toolbar dense fixed>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-title>CSCI 2720 Project</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/about">About</v-btn>
        <v-btn ref="loginBtn" flat to="/login">Login</v-btn>
        <v-btn ref="SignupBtn" flat to="/signup">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <br>
    <br>
    
    <main padding-top>
      <router-view />
    </main>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {};
  },
};

</script>
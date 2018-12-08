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

    <router-view/>
  </div>
</template>

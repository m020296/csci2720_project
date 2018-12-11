<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="admin">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="flushData">
          <v-list-tile-action>
            <v-icon>cloud_download</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Flush Data Online</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="loadCSV">
          <v-list-tile-action>
            <v-icon>cloud_upload</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Load CSV file</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="eventData">
          <v-list-tile-action>
            <v-icon>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage Event Data</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="userData">
          <v-list-tile-action>
            <v-icon>supervised_user_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manage User Data</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CSCI 2720 Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-btn @click="logout" light>Logout</v-btn>
    </v-toolbar> 
        <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex  xs12 sm10 md10>
          <v-card class="elevation-12">
            <v-card-title>
              <span class="headline">Hi, Admin </span>
            </v-card-title>
            <v-card-text>
            <p>As an Admin, you can:<br>
              1. Flush data, i.e. reload from the online dataset<br>
              2. CRUD event data in the local database<br>
              3. CRUD user data (username and password only) in the local database<br>
              4. Obtain event data from CSV file upload (simple instructions need to be provided for
              user for data format)<br>
              5. Log out as admin<br>
              </p>
            </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
      
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  },
  methods: {
    logout: function() {
      this.$router.replace("login");
    },
    admin: function(){
      this.$router.replace("admin");
    },
    flushData: function(){
      this.$router.replace("flushData");
    },
    loadCSV: function(){
      this.$router.replace("loadCSV");
    },
    eventData: function(){
      this.$router.replace("eventData");
    },
    userData: function(){
      this.$router.replace("userData");
    }
  }
};
</script>
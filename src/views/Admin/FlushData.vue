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
          <v-flex  xs12 sm8 md8 text-xs-center>
            <v-card class="elevation-12">
              <br>
              <h4>Flush Data from online (This may take a while..)</h4>
              <v-tooltip left>
                <v-btn v-bind:disabled="btnDisable" slot="activator" @click="flush_data" icon large target="_blank">
                  <v-icon large>cloud_download</v-icon>
                </v-btn>
                <span>Click to flush data</span>
              </v-tooltip>
              <br><br>
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
import axios from 'axios';
import { db } from '../../main';
export default {
  data: () => ({
    drawer: null,
    btnDisable: false
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
    },
    flush_data: function(){
      this.btnDisable = true;
      let count = 0;
      db.collection('event').where('dummy','==',1).get()
      .then(function(querySnapshot) {
            // Once we get the results, begin a batch
            var batch = db.batch();

            querySnapshot.forEach(function(doc) {
                // For each doc, add a delete operation to the batch
                batch.delete(doc.ref);
            });

            // Commit the batch
            return batch.commit();
      }).then(function() {
          // Delete completed!
          var url = 'http://fundraising.one.gov.hk/fundraise_query/webservice/psi/json?itemperpage=100&page=';
          var i;
          let promises = []
          for (i = 1; i <= 4; i++) { 
            promises.push(new Promise((resolve, reject) => {
              axios
              .get(url+i)
              .then(function (response) {
                response.data.activities.forEach(function(activity){
                  var datetime = activity.schedule[0].dateFrom + " " + activity.schedule[0].timeFrom;  
                  var district = activity.districtNameEnglish; 
                  var title = activity.activityNameEnglish;
                  var organization = activity.organisationNameEnglish;
                  var venue = activity.locationNameEnglish;
                  console.log(title + " " + organization + " " + district + " " + venue + " " + datetime);
                  db.collection('event').add({title: title, organization: organization, district: district, venue: venue, datetime: datetime, dummy:1});
                  resolve(response.data);
                  count++;
                })
              })
            }))
          };
          Promise.all(promises).then(function(){
            alert("Flush data done! Reloaded "+count+" records.");
            this.btnDisable = false;
          })
      }); 

      
    }
  }
};
</script>
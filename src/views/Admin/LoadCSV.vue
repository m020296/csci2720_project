<template>
<!-- Shum Hiu Tung (1155063707)
Suen Ka Leong (1155062592)
So Hon Chuen (1155062753) -->
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
        <v-layout align-start justify-center>
          <v-flex xs12 sm8 md8>
            <v-card class="elevation-12">
              <v-card-title>
                <span class="headline">Load CSV to Database </span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <p>CSV format (NO header, seperated by tab):<br>
                    title  datetime  organization  venue  district<br>
                  </p> 
                  <upload-btn v-bind:disabled="uploadBtnDisable"
                    :fileChangedCallback="fileChanged"
                    accept=".csv"
                    title="Upload CSV ">
                    <template slot="icon">
                      <v-icon>add</v-icon>
                    </template>
                  </upload-btn>
                  <br>
                  CSV Preview:
                  <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Datetime</th>
                            <th>Origanizer</th>
                            <th>Venue</th>
                            <th>District</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="result in results">
                            <th>{{result.title}}</th>
                            <th>{{result.datetime}}</th>
                            <th>{{result.organization}}</th> 
                            <th>{{result.venue}}</th> 
                            <th>{{result.district}}</th> 
                        </tr>
                    </tbody>
                </table>
                <v-btn color="primary" v-bind:disabled="saveBtnDisable" @click.native="save">Save to Database</v-btn>
                </v-container>
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
import axios from 'axios';
import { db } from '../../main';
import UploadButton from 'vuetify-upload-button';
export default {
  components: {
      'upload-btn': UploadButton
    },
  data: () => ({
    drawer: null,
    saveBtnDisable: true,
    uploadBtnDisable: false,
    parse_header: [],
    parse_csv: [],
    results: []
  }),
  props: {
    source: String
  },
  methods: {
    logout: function() {
      this.$router.push("login");
    },
    admin: function(){
      this.$router.push("admin");
    },
    flushData: function(){
      this.$router.push("flushData");
    },
    loadCSV: function(){
      this.$router.push("loadCSV");
    },
    eventData: function(){
      this.$router.push("eventData");
    },
    userData: function(){
      this.$router.push("userData");
    },
    fileChanged (file) {
      console.log(file);
      var vm = this
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
          var csv = event.target.result;
          let lines = csv.split("\n");
          let headers = ['title', 'datetime', 'organization', 'venue', 'district'];
          lines.map(function(line, indexLine){
            if (line.length < 2) return;
            var obj = {};
            var currentline = line.split("\t");
            headers.map(function(header, indexHeader){
              obj[header] = currentline[indexHeader];
            })
            vm.results.push(obj);
            vm.uploadBtnDisable = true;
            vm.saveBtnDisable = false;
          })
        };
        reader.onerror = function(evt) {
          if(evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert('FileReader are not supported in this browser.');
      }
    },
    save(){
      var vm = this;
      let count = 0;
      let promises = []
      vm.saveBtnDisable = true;
      promises.push(new Promise((resolve, reject) => {
        vm.results.forEach(function(activity){
            var datetime = activity.datetime;  
            var district = activity.district; 
            var title = activity.title;
            var organization = activity.organization;
            var venue = activity.venue;
            console.log(title + " " + organization + " " + district + " " + venue + " " + datetime);
            db.collection('event').add({title: title, organization: organization, district: district, venue: venue, datetime: datetime, dummy:1});
            resolve(activity);
            count++;
          })
      }))
      Promise.all(promises).then(function(){
        alert("Data saved! Saved "+count+" records.");
        setTimeout(function(){  vm.$router.push("eventData"); }, 500);
      })
}
  }
};
</script>
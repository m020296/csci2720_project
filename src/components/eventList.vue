  <template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-start justify-center>
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
              <div>
                <v-toolbar flat color="white">
                  <v-toolbar-title>List of Activities</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-spacer></v-spacer>

                  <v-toolbar dense style="flex-basis: 60%">
                    <v-overflow-btn
                      :items="dropdown_edit"
                      v-model="searchField"
                      label="Select field"
                      hide-details
                      class="pa-0"
                      overflow
                      
                    ></v-overflow-btn>

                    <v-text-field
                      v-model="keyword"
                      hide-details
                      class="pa-0"
                      overflow
                      label="Keyword"
                      single-line
                    ></v-text-field>

                    <v-btn icon flat @click="search">
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <!-- <v-toolbar style="flex-basis: 60%" flat wrap>
                    
                    <v-overflow-btn id="dropDown" fill-height height='2.5em' label="Field"></v-overflow-btn>
                    <v-text-field hide-details prepend-icon="search" single-line></v-text-field>

                    <v-btn icon>
                      <v-icon>my_location</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>-->
                </v-toolbar>

                <v-data-table
                  :headers="headers"
                  :items="activities"
                  :rows-per-page-items="[10,5]"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.title }}</td>
                    <td class="text-xs-left">{{ props.item.datetime }}</td>
                    <td class="text-xs-left">{{ props.item.organization }}</td>
                    <td class="text-xs-left">{{ props.item.venue }}</td>
                    <td class="text-xs-left">{{ props.item.district }}</td>
                    <td class="justify-center layout pa-3">
                      <!-- <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon> -->
                      <router-link :to="'/events/' + props.item.id +'/'+ props.item.title + '/' + props.item.datetime + '/' + props.item.organization + '/' + props.item.venue + '/' + props.item.district">
                        <v-icon>more_horiz</v-icon>
                      </router-link>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { db } from "../main";
export default {
  data: () => ({
    dropdown_edit: ["Title", "District", "Venue", "Organization", "Datetime"],
    searchField: "Title",
    keyword: "",
    drawer: null,
    dialog: false,
    headers: [
      {
        text: "Title",
        align: "left",
        value: "title"
      },
      { text: "Datetime", value: "datetime" },
      { text: "Organization", value: "organization" },
      { text: "Venue", value: "venue" },
      { text: "District", value: "district" }
    ],
    activities: [],
    editedItem: {
      id: "",
      title: "",
      datetime: "",
      organization: "",
      venue: "",
      district: ""
    }
  }),
  firestore() {
    return {
      activities: db.collection("event").orderBy("title")
    };
  },
  computed: {
    pathToDetail: function(id) {
      return 'events/' + id;
    }
  },

  watch: {},

  methods: {
    detail: function() {
      const currentUser = firebase.auth().currentUser;
      console.log("Email: " + currentUser.email);
      console.log("clicked");
    },
    search: function() {
      // console.log("Test: " + this.searchField.toLowerCase() + this.keyword);
      db.collection("event")
        // .where(this.searchField.toLowerCase(), "==", this.keyword)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            console.log("Test2: " + this.searchField.toLowerCase() + this.keyword);
            let field = this.searchField.toLowerCase()
            let keyword = this.keyword
            let acts = [];
            querySnapshot.docs.forEach(function(doc) {
              // console.log("hi")
              console.log("Test: " + doc.data()[field] + field + keyword)
              
              if (doc.data()[field] != undefined && doc.data()[field].indexOf(keyword) != -1) {
                console.log("---- " +  doc.data()[field].indexOf(keyword) + " ----")

                acts.push(doc.data());
              }
            });
            console.log(acts[0]);
            return (this.activities = acts);
          } else {
            console.log("querySnapshot empty");
          }
        });
    }
  }
};
</script>

<style>
</style>

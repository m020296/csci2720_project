<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
          <div>
            <v-layout row wrap text-xs-center>
              <v-flex xs12 sm6>
                <v-btn flat color="indigo" @click="addFav">
                  <v-icon>star</v-icon>
                  <p>Add to favourite</p>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn left small color="primary" to="/events">Back</v-btn>
              </v-flex>
            </v-layout>

            <h1>Title:
              <br>
              <span>{{title}}</span>
            </h1>
            <div>
              <h3 class="headline mb-0">Datetime:
                <br>
                <span class="font-weight-bold">{{datetime}}</span>
              </h3>
              <br>
              <h3 class="headline mb-0">Organization:
                <br>
                <span class="font-weight-bold">{{organization}}</span>
              </h3>
              <br>
              <h3 class="headline mb-0">Venue:
                <br>
                <span class="font-weight-bold">{{venue}}</span>
              </h3>
              <br>
              <h3 class="headline mb-0">District:
                <br>
                <span class="font-weight-bold">{{district}}</span>
              </h3>
            </div>
          </div>
        </v-card-title>

        <v-divider inset></v-divider>
        <v-card-title primary-title>
          <h1>Comment Session</h1>
        </v-card-title>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <!-- <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>-->
            <v-list-tile :key="item.title">
              <!-- <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>-->
              <v-list-tile-content>
                <v-list-tile-title v-html="item.username" style="text-decoration: underline"></v-list-tile-title><span v-html="item.comment"></span>
                <v-list-tile-sub-title  v-html="item.timestamp"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>

        <v-card-actions>
          <v-flex xs12>
            <v-textarea v-model="inputComment" outline name="input-7-4" label="Outline textarea"></v-textarea>
            <div>
              <v-btn @click="submitComment(inputComment)" align-end color="info">Submit Comment</v-btn>
            </div>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  props: {},
  data: () => ({
    inputComment: "",
    items: [],
    id: "",
    title: "",
    datetime: "",
    organization: "",
    venue: "",
    district: ""
  }),
  created() {
    this.id = this.$route.params.id;
    this.title = this.$route.params.title;
    this.datetime = this.$route.params.datetime;
    this.organization = this.$route.params.organization;
    this.venue = this.$route.params.venue;
    this.district = this.$route.params.district;
    //return comment here
    const cmRef = db.collection("comment");
    cmRef
      .where("eventID", "==", this.id)
      .get()
      .then(querySnapshot => {
        let comment = [];
        querySnapshot.docs.forEach(function(doc) {
          // console.log("hi")
          //   console.log("Test: " + doc.data()[field] + field + keyword);

          //   if (doc.data()[eventI]) {
          // console.log("---- " + doc.data()[field].indexOf(keyword) + " ----");
            console.log(doc.data()["timestamp"])
          comment.push(doc.data());
          //   }
        });
        this.items = comment;
      });
  },
  methods: {
    submitComment: function(cm) {
      console.log(cm);
      if (cm.length == 0) {
        console.log("no comment");
        alert("Cannot leave empty comment");
      } else {
        let username = "";
        let eventID = this.$route.params.id;
        const currentUser = firebase.auth().currentUser;
        const usersRef = db.collection("user");

        usersRef
          .where("email", "==", currentUser.email)
          .limit(1)
          .get()
          .then(querySnapshot => {
            username = querySnapshot.docs[0].data().username;

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var minute = today.getMinutes();

            if (dd < 10) {
              dd = "0" + dd;
            }

            if (mm < 10) {
              mm = "0" + mm;
            }

            today = mm + "/" + dd + "/" + yyyy + " " + hh + ":" + minute;
            // document.write(today);
            console.log(
              "Commenting user: " +
                username +
                " eID: " +
                eventID +
                " CM: " +
                cm +
                " time: " +
                today
            );

            const cmRef = db.collection("comment");

            let tempCM = {
              username: username,
              timestamp: today,
              eventID: eventID,
              comment: cm
            };

            cmRef.add(tempCM).then(docRef => {
              console.log(tempCM);
              console.log("New Comment Added.");
              this.update();
              this.inputComment = ""
            });
          });
      }
    },
    update: function() {
      const cmRef = db.collection("comment");
      cmRef
        .where("eventID", "==", this.id)
        .get()
        .then(querySnapshot => {
          let comment = [];
          querySnapshot.docs.forEach(function(doc) {
            // console.log("hi")
            //   console.log("Test: " + doc.data()[field] + field + keyword);

            //   if (doc.data()[eventI]) {
            // console.log("---- " + doc.data()[field].indexOf(keyword) + " ----");

            comment.push(doc.data());
            //   }
          });
          this.items = comment;
        });
    },
    addFav: function() {}
  }
};
</script>
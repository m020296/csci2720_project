<template>
  <v-content>
  <v-layout align-start justify-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-layout row wrap text-xs-center>
              <v-flex xs12 sm6>
                <v-btn flat color="indigo" @click="backPre">Back</v-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn flat color="primary" @click="state ? addFav() : delFav()">
                  <v-icon>{{this.buttonIcon}}</v-icon> {{this.buttonStatment}}
                </v-btn>
              </v-flex>
        </v-layout>
        <v-divider ></v-divider>
        <v-card-title primary-title>
          <div>
            
            <h2>{{title}}</h2><br>
            <div>
              <br>
              <h4>Datetime</h4>
              <span class="font-weight">{{datetime}}</span><br><br>
              
              <h4>Organization</h4>
              <span class="font-weight">{{organization}}</span><br><br>
              
              <h4>Venue</h4>
              <span class="font-weight">{{venue}}</span><br><br>
              
              <h4>District</h4>
              <span class="font-weight">{{district}}</span><br><br>
            </div>
          </div>
        </v-card-title>
        <v-divider ></v-divider>
        <v-divider ></v-divider>
        <v-card-text>
          <v-flex text-xs-center xs12 sm12 md12>
            Comments
          </v-flex>
        </v-card-text>
        <v-divider ></v-divider>

        <v-list two-line light>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.title">
              <v-list-tile-avatar>
                <v-icon>directions_run</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title><span v-html="item.username" class="font-weight-bold" ></span>&nbsp;&nbsp;<span v-html="item.comment"></span></v-list-tile-title>
                <v-list-tile-sub-title  v-html="item.datetime"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>

        <v-card-actions>
          <v-flex xs12>
            <v-textarea v-model="inputComment" outline name="input-7-4" label="Comments..."></v-textarea>
            <div>
              <v-btn v-bind:disabled="btnDisable" @click="submitComment(inputComment)" align-end color="info">Submit</v-btn>
            </div>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-content>
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
    district: "",
    favEvent: [],
    btnDisable: false,
    buttonStatment: "",
    buttonIcon: "",
    state: true
  }),
  firestore () {
    return {
      items: db.collection('comment').where("eventID", "==", this.$route.params.id).orderBy('timestamp')
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.title = this.$route.params.title;
    this.datetime = this.$route.params.datetime;
    this.organization = this.$route.params.organization;
    this.venue = this.$route.params.venue;
    this.district = this.$route.params.district;
    //check this page is in fav or not

    const currentUser = firebase.auth().currentUser;
    db.collection("user").doc(currentUser.uid).get().then((data) => {
            //console.log(data.data());
            const ref = data.data();
            this.favEvent = ref.favEvents;
            console.log(this.favEvent);
            if(!this.favEvent.includes(this.id)){
              this.buttonIcon = "star";
              this.buttonStatment = "Add to favourite";
              //assign the addFav to id="favBtn"
            }else{
              this.buttonIcon = "delete";
              this.buttonStatment = "Delete this favourite";
              //assign the addFav to id="favBtn"
              this.state = !this.state;
            }
    });





    //return comment here
    
    // const cmRef = db.collection("comment");
    // cmRef
    //   .orderBy("timestamp")
    //   .where("eventID", "==", this.id)
    //   .get()
    //   .then(querySnapshot => {
    //     let comment = [];
    //     querySnapshot.docs.forEach(function(doc) {
    //       // console.log("hi")
    //       //   console.log("Test: " + doc.data()[field] + field + keyword);

    //       //   if (doc.data()[eventI]) {
    //       // console.log("---- " + doc.data()[field].indexOf(keyword) + " ----");
    //         console.log(doc.data())
    //       comment.push(doc.data());
    //       //   }
    //     });
    //     this.items = comment;
    //   });

  },
  methods: {
    submitComment: function(cm) {
      console.log(cm);
      if (cm.length == 0) {
        console.log("no comment");
        alert("Cannot leave empty comment");
      } else {
        this.btnDisable = true;
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
            var timestamp = firebase.firestore.FieldValue.serverTimestamp()
            console.log(timestamp)
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

            if(minute < 10){
                minute = "0" + minute
            }

            if(hh < 10){
                hh = "0" + hh
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
                " timestamp: " +
                timestamp +
                " datetime: " +
                today 
            );

            const cmRef = db.collection("comment");

            let tempCM = {
              username: username,
              timestamp: timestamp,
              datetime: today,
              eventID: eventID,
              comment: cm
            };

            cmRef.add(tempCM).then(docRef => {
              console.log(tempCM);
              console.log("New Comment Added.");
              // this.update();
              this.inputComment = ""
              this.btnDisable = false;
            });
          });
      }
    },
    // update: function() {
    //   const cmRef = db.collection("comment");
    //   cmRef
    //     .orderBy("timestamp")
    //     .where("eventID", "==", this.id)
    //     .get()
    //     .then(querySnapshot => {
    //       let comment = [];
    //       querySnapshot.docs.forEach(function(doc) {
            
    //         // doc.data().timestamp = doc.data().timestamp.toDate()
    //         // console.log(doc.data().timestamp.toDate().toString())
    //         comment.push(doc.data());
            
    //       });
    //       this.items = comment;
    //     });
    // },
    addFav: function() {
        const currentUser = firebase.auth().currentUser;
        
        db.collection("user").doc(currentUser.uid).get().then((data) => {
            //console.log(data.data());
            const ref = data.data();
            this.favEvent = ref.favEvents;
            //find weather the id is existed inside the array
            if(!this.favEvent.some((ele) => ele === this.id)){
                this.favEvent.push(this.id);
                //console.log(ref.favEvents);
                db.collection('user').doc(currentUser.uid).update({
                    favEvents: this.favEvent
                })
                alert("This event is added to your favourite.")
            }
            console.log(this.favEvent);
            this.buttonIcon = "delete";
            this.buttonStatment = "Delete this favourite";
            //assign the addFav to id="favBtn"
            this.state = !this.state;
        })
        
    },
    delFav: function() {
      const currentUser = firebase.auth().currentUser;
      const valueToRemove = this.id;
      const filteredItems = this.favEvent.filter(function(item) {
        return  item !== valueToRemove
      })
      db.collection('user').doc(currentUser.uid).update({
        favEvents: filteredItems
      })
      this.favEvent = filteredItems;
      console.log(this.favEvent);
      this.buttonIcon = "star";
      this.buttonStatment = "Add to favourite";
      //assign the addFav to id="favBtn"
      this.state = !this.state;
      alert("This event is removed from your favourite")
    },
    backPre: function() {
      window.history.go(-1);
    }
  }
};
</script>
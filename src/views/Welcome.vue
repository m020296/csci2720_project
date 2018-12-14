<template>
  <v-app id="inspire">
    <!-- /* eslint-disable */ -->
    <v-navigation-drawer v-model="drawer" clipped fixed app width="200">
      <v-list dense>
        <v-list-tile to='/events' id="test">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to='/favs' id="test2">
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Favourite</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left color="light-blue lighten-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>User Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <v-btn flat disabled id="userInfo">{{text}}</v-btn>
      <v-btn @click="logout" color="primary">Logout</v-btn>
    </v-toolbar>

    <v-content id="userContent" >
      <v-container>
        <!--<component v-bind:is="component"></component>-->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import eventList from "./../components/eventList.vue";
import favList from "./../components/favouriteList.vue";
import { db } from "../main";

export default {
  components: {
    eventList: eventList,
    favList: favList
  },
  data: () => ({
    drawer: null,
    text: "",
    component: "eventList"
  }),
  props: {
    source: String
  },
  beforeCreate() {
    // console.log("test");
    // console.log(this.text);
    const currentUser = firebase.auth().currentUser;
    console.log("Email: " + currentUser.email);
    this.text = "";
    const usersRef = db.collection("user");

    usersRef
      .where("email", "==", currentUser.email)
      .limit(1)
      .get()
      .then(
        // function(querySnapshot) {
        //   if(querySnapshot.exists){
        //   console.log("Exsit");
        // }
        //   querySnapshot.forEach(function(doc) {
        //       // doc.data() is never undefined for query doc snapshots
        //       console.log(doc.id, " => ", doc.data());
        //   });
        //  })
        querySnapshot => {
          // if (!querySnapshot.empty) {
            // console.log("--Test--: " + )
            // console.log("success" + this.username + " " + this.password);
            // console.log("Deep : " + querySnapshot.docs[0].email);
            // console.log("Now: " + this.text)

            this.text = querySnapshot.docs[0].data().username;
            //     firebase
            //     .auth()
            //     .signInWithEmailAndPassword(querySnapshot.data().email, this.password)
            //     .then(
            //       user => {
            //         // this.$router.push("welcome");
            //         // alert("login-ed")
            //       },
            //       err => {
            //         alert("Oops. " + err.message);
            //       }
            //     );
          // } else {
            // alert("User does not exists");
          // }
        }
      );
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>
#userInfo {
  color: black !important;
  text-transform: none !important;
}

#userContent{
  padding: 0px 0px 0px 0px !important;
}

#test{
  text-decoration: none;
}

#test2{
  text-decoration: none;
}
</style>

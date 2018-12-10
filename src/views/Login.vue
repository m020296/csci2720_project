<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <!-- <v-text-field
                    v-model="email"
                    id="email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                  ></v-text-field>-->
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="white" to="/signup">Sign up</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "login",
  data() {
    return {
      username: "",
      //   email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      console.log(
        "User input: " + this.username + " " + this.email + " " + this.password
      );

      db.collection("user")
        .where("username", "==", this.username)
        .get()
        .then(function(querySnapshot) {
          let email = "";
          let password = this.password;

          if (password.length <= 5) {
            console.log("in");
            pw = "00" + pw;
          }
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().email, " => ", doc.data());
            email = doc.data().email;
          });

          console.log("User info: " + email + password);

          firebase
            .auth()
            .signInWithEmailAndPassword(email, this.password)
            .then(
              user => {
                this.$router.replace("welcome");
                // alert("login-ed")
              },
              err => {
                alert("Oops. " + err.message);
              }
            );
        })
        .catch(function(err) {
          console.log("Error getting documents: ", error);
        });
    }
  }
};
</script>
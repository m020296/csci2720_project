<template>
  <!-- <div class="sign-up"> -->
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>SignUp</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" @submit.prevent="validateBeforeSubmit()">
                  <v-text-field
                    v-model="username"
                    :rules="usernameRule"
                    id="username"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRule"
                    id="email"
                    prepend-icon="email"
                    name="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="pwRule"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    required
                    ref="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirm_password"
                    :rules="[checkPW(password)]"
                    id="confim_password"
                    prepend-icon="lock"
                    name="confim_password"
                    label="Enter Password Again"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="white" to="/login">Back to Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="signUp" color="primary">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

  <!-- <p>Sign Up</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
  <span>or go back to <router-link to="/login">login</router-link>.</span>-->
  <!-- </div> -->
</template>

  <script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "signUp",
  data: () => ({
    valid: false,
    username: "",
    usernameRule: [
      v => !!v || "Username is required",
      v => v.length <= 20 || "Username must be less than 20 characters",
      v => v.length >= 4 || "Username must be more than or equal 4 characters"
    ],
    email: "",
    emailRule: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    pwRule: [
      v => !!v || "Password is required",
      v => v.length <= 20 || "Password must be less than 20 characters",
      v => v.length >= 4 || "Password must be more than or equal 4 characters"
    ],
    confirm_password: "",
    confirm_pwRule: [
      v => !!v || "Confirm Password is required"
      // v => v == this.password || "Same as password",
      // checkPW() || "GG"
    ]
  }),
  methods: {
    checkPW(pw) {
      console.log(pw + " " + this.confirm_password);
      if (pw == this.confirm_password) return true;
      else return "Confirm Password must be equal to password";
    },

    signUp: function() {
      const usersRef = db.collection("user").doc(this.username);

      usersRef.get().then(docSnapshot => {
        let result = "";
        if (docSnapshot.exists) {
          console.log("success" + this.username + this.email + this.password);
          console.log(docSnapshot.data().email);
          alert("this username is used")
        } else {

            console.log("success" + this.username + this.email + this.password);

          let pw = this.password;
          console.log(this.email + " " + this.password);
          if (pw.length <= 5) {
            console.log("in");
            pw = "00" + pw;
          }
          console.log("after: " + this.email + " " + pw);
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, pw)
            .then(
              user => {
                let uid = firebase.auth().currentUser.uid;

                db.collection("user")
                  .doc(this.username)
                  .set({
                    email: this.email,
                    favEvents: []
                  });
                console.log(
                  "added to db: " + this.username + " " + uid + " " + this.email
                );
                this.$router.replace("welcome");

                // alert("nice");
              },
              err => {
                alert("Oops. " + err.message);
              }
            );




        }
      });
    }
  }
};
</script>

  <style scoped>
</style>
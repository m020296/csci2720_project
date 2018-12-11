// Suen Ka Leong
//1155062592

var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors()); 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project2720-eafa3.firebaseio.com'
});

app.get('/listUsers', function(req,res) {
	admin.auth().listUsers()
    .then(function(listUsersResult) {
    	console.log(listUsersResult.users);
      res.send(listUsersResult.users);
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
});

app.post('/createUser', function(req,res) {	
	console.log(req.body);
	admin.auth().createUser({
	  email: req.body.email,
	  password: req.body.password,
	  disabled: false
	})
	  .then(function(userRecord) {
	    // See the UserRecord reference doc for the contents of userRecord.
	    console.log("Successfully created new user:", userRecord.uid);
	    res.send(userRecord.uid);
	  })
	  .catch(function(error) {
	    console.log("Error creating new user:", error);
	    res.send("error");
	  });
});

app.post('/deleteUser', function(req,res) {	
	console.log(req.body);
	admin.auth().deleteUser(req.body.uid)
	  .then(function() {
	    console.log("Successfully deleted user");
	    res.send("success");
	  })
	  .catch(function(error) {
	    console.log("Error deleting user:", error);
	    res.send("error");
	  });
});

app.post('/updateUser', function(req,res) {	
	console.log(req.body);
	admin.auth().updateUser(req.body.uid, {
	  email: req.body.email,
	  password: req.body.password,
	  disabled: false
	})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated new user:", userRecord.uid);
    res.send(userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error updating user:", error);
    res.send("error");
  });
});

// listen to port 3000
var server = app.listen(3000);
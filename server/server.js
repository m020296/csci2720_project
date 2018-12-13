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
var serviceAccount_backup = require('./serviceAccountKey_backup.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount_backup),
  databaseURL: 'https://project2720-eafa3.firebaseio.com'
});

app.get('/listUsers', function(req,res) {
	admin.auth().listUsers()
    .then(function(listUsersResult) {
    	console.log("received list users request..");
      res.send({"error":"","users":listUsersResult.users});
    })
    .catch(function(error) {
      //res.send("error");
      res.send({"error":"error","msg":error.errorInfo.message});
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
	    res.send({"error":"","uid":userRecord.uid});
	  })
	  .catch(function(error) {
	    console.log("Error creating new user:", error);
	    res.send({"error":"error","msg":error.errorInfo.message});
	  });
});

app.post('/deleteUser', function(req,res) {	
	console.log(req.body);
	admin.auth().deleteUser(req.body.uid)
	  .then(function() {
	    console.log("Successfully deleted user");
	    res.send({"error":""});
	  })
	  .catch(function(error) {
	    console.log("Error deleting user:", error);
	    res.send({"error":"error","msg":error.errorInfo.message});
	  });
});

app.post('/updateUser', function(req,res) {	
	console.log(req.body);
	admin.auth().updateUser(req.body.uid, {
	  // email: req.body.email,
	  password: req.body.password,
	  disabled: false
	})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated new user:", userRecord.uid);
    res.send({"error":"","uid":userRecord.uid});
  })
  .catch(function(error) {
    console.log("Error updating user:", error);
    res.send({"error":"error","msg":error.errorInfo.message});
  });
});

// listen to port 3000
var server = app.listen(3000);
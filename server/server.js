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

//ori
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: 'project2720-eafa3',
//     clientEmail: 'firebase-adminsdk-xbn8h@project2720-eafa3.iam.gserviceaccount.com',
//     privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCJai8o1Mbi0S2h\naxZ3jhwol+3kt8W0Qvn6NtlwkfUYK+jQkLPW3K9nSH5zjqB2oo6ZsWY0zwxpx0/9\nx0DuKicvn5+vd6B0u3mzx1pHQfOUK9SQuW+u3BXfjENxy15dRPQkXxmCqVtsG7gr\ny4Ccgg1iHFAsli7/LZVNPMQwdf8FJFdvVvXm4Obv8eaoXk/LzLBDdPsneFwcWdd9\nnWQeThffqVSNE2YvGAjafjCLDQfhNNROs0Oek6dc1OwayEUS/daMqnql6StsuLwE\nol18/JQfxU7pe3nir8T7YwIiK7syz2L/8BPS/kzIsgHhC8GzLiDKco6Vrdq4CQWR\np+2nb52xAgMBAAECggEABFqZcO1A+fnPvNAUT6hwiva5YmhSOtJucjefrxnozqHB\niC41jIbEhfy9iPLJccjXxNXim6S9y3I1viA8le8++5rOp/Qd4OT5x7D20tArpBO5\ncfZ2K++sP7+FeYsMi97971MWD1ZHX8cHEFgr1ImoW+Xywl7l0U8D7oUQ4Eo00NhY\ni8M6Qjct5nyDWuQ8rS8y7Dcxw1YLP+4FWpl4qZmUTEH5xPd6R7l2Blx5q5uXSgrp\nZKP2mlvA80cIsYd/KxwlNM8KBllnvu2a4vAAGbBYsPanmmhEOnlQTVEBNeTZoS37\ns7XbvqyaqK9uPzJpOfjbDs5FXtwn8ojWdSmnY/GGAQKBgQC+p80MaU3xmTskGl7Y\nDF72fG8+xVRtpFPbjT2SQD1gsmF8wIgOaM6u40t8g80g2FlcUy1tRgtulxGBGDgx\nUnRKQsKU3ueNd8U+82qFXrIL2xmjsw+hpIYC8qKvTBokuqVOZHaDWQgE0Xkgb7SM\nBzQl9o9275KoT4ATPADbjEJ7QQKBgQC4gwVBZjglJxM+KLVdjz1ikHRi4AmZh3ZS\np5iu6FRpR//nN3aJ/O70CAa/m1f0pBv0TvE/5jQakGIWrPrg8h7eN4GXkTOJFKdS\nWA8YFF+RKwviUCRiegMyk6ep02kd5MOVifYGhGXviP6y4xzYDTzbnejdcUaOG8FZ\npZa6n7e2cQKBgQCADRHiQSPxndoj8HY9I2nwoTjSbxS6o0ETV/S/stfGh2iEsodv\nLiOLQOwlUBzI76ZtJQyAtSfeeiZuj0bGkbu7WMV52ZCp6oSXOEQWGbj5z4mT8iMQ\njQDZH//2PuXcP2PhmAYlR/njypFRINWhqwDycnx/BH96/hJmWMm2q6jHQQKBgARr\njxqr+jhZoUph60Zcghn0X/VmbJRy/FCqlyvJgQwsn2LIn1xa5NaPwqmgbRD9RXYq\n1fiz6Reh0de9OR1eb4LfTYl1/wgPqJp+ZY4sHsX5hAVd6iE5zw3NH70fxWrj6hOR\nBIXPcim03HUon65FUunn9IYpioko/Q7Kurupy9rhAoGBAJXRuHayTkG2nz6vmVt4\npMyilLaKUjtjWtqsD4h6YQYoOyQmrKpDhiws/HcwMujiKKyrGSHL3AagArgF3XWL\nzbxtAPqqDpMY7GLou6N0tdE8AuurHut4Fzzvw6xQtJdnke++j5TFPDnD5m3IdfkO\nmb5GdG6LsG/tYO/Nrpdi0ogO\n-----END PRIVATE KEY-----\n'
//   }),
//   databaseURL: 'https://project2720-eafa3.firebaseio.com'
// });

//bak
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'backup-a7bf7',
    clientEmail: 'firebase-adminsdk-iaqmf@backup-a7bf7.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbgz31/4ok7Lq/\n3YtMQZE/9oJhtLJ2mFs83/C3B7cLob1LpmrXQOEB79kMlkOTotP2g5EHrOUrwpeV\n9cLsDbrFt2wDgdhiwgTKA4udnael0ZPK++sRbODkA7xw/LvI8pM97P2n0CMA+O1j\nC79JOz9ZCIrQu1y/iw0Sye6HvYgUue1jkKkN3WTsLZNHguykZAthh3TZvwtfXVs1\nAomYrS3FutqVy3QbNS9KSRBiBUQcrq0TM4x0i4kh+kq7aXv5K/hSzK9Wp/xouPmQ\noNs/cobJA5a8YZhRHYcxXQ8D8P0dvLts4Gs/K8x4HNOxczEqy+4ui3ajzpTMufhR\n5JtnMlDdAgMBAAECggEAHxQ8ClE/IQEEk3qpr5w89I0F4pPzxJrPRRu2JkYO8W6p\n/5frK0imjzYJaSgQqk000kPZ9LA7fqLdm5UplvZpeMEe/5ZwEdCXl23c9at/yTZY\ntIzjHjDlwvvyKZyAxPihr5MQ4HxKupOFEbHT0UVbdCYuY+fF8evOuY4MsykQLJ/q\nA/CsVt0WY/ouBc8htELtC0cLmQWKfoyoXaRTZAUOKAb8X8B2jPl0dFMxD2h9RzGN\nrz4SVRlYIf5Yb7LDqhrPq8VlDI9aiaTRnqJm4FJZuQU/zYfjfPR64WCtLB55yuCm\nz1qjKRNy0NhPMirYbLml4qr29uJlUqHApgkQ58ko6wKBgQDOBMbh3eJpCzGJ3AUa\n2nntCO3CVRbatF9nKmIFuICP/aW9rxyR2XdxkOvln0TncHADWS2INf24U7qHlsQL\nAEE31BKiKiMrxV/gzcmKwFQbwCugdzb2Q4Dn1xlt1ePBaz0Uy+sG2Lj2QVqN7mlC\n9QZ0De6l+9Br18ACb9P1oX1u5wKBgQDBPa8QOqJeUc+PfnKjmrMF4XKtP9L0sK1F\nLgBCWgh5DbYX5IvLGKpua/DEzG9y6YseUiINrn0jfLltCx2Z7FR9Jg5sjtDskab2\nMgbFbyfClRMrXtOJdTvp2pcoQSodHHAAOeehuH/WN8rXrkzLatOqQycbsfa/hFy/\nslwJWdAdmwKBgQC7X9DbIQmJbGrT7c6ey9JU6egE9Yrhw2d51yxr85DKZXHXAWtE\no7tlCN/kamUq8jKOeQ9WcXSfr1dZdqA7OTIX6sQ/xX9TkiJPvhruHVriGngTbBoL\nBP463oH8SarqAfT98zGBep9PKcWIjSwjf+Msrnc9c7fuPb4e+UKYhxYkRQKBgQCG\nrqROLl+uV1zPyTTDXHX72kbgA0TXsDADsG0T0cZoAKtyeaMJGZbnwSmdMFNZBvck\nWeBMItorGqnuGzo1Zqb4Vsbk2KE60MVKgFGB19ghYV9r8fqDqobolaaWstxUT9as\nAa+0YnAO8PHaYyw49qqx133xapbsoqc2IGzPQ56ukwKBgEnOCRJVrCoXHaCgSr1H\n5CUl6BgnsD2qgWN5rGhjVr+6mDhiAQMZbrqNNPBrIso0pCfNfixQb7hEnbh9gpXx\nXOKFmnB5s+wYuE8Nu+uBR+ahUjA+fPc5D3ZXE2dGg3Os80nb884nIyp4FXOM3BXb\n18J2p3Kaodlbrp+L2vJ3NzB/\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://backup-a7bf7.firebaseio.com'
});

//bak2
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: 'back2-2f39f',
//     clientEmail: 'firebase-adminsdk-j9pec@back2-2f39f.iam.gserviceaccount.com',
//     privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCWo75vGJAcpTbz\n0tAKtUdkYYwYWp00NCUsLh44TU7smZWopUu2dZ/UX1dCJveobPHlc8OR9Bpi+krK\nTLY8Yk3afQpQkzsaF8c3h5tJsQk0Q0o5NRhX4HfA/YRGFyPiqPfFBgMYoPYsta1S\nNhW8gCnEk+2VkRUTo1T02ikL8ZuRwZEn5uRVN1Bs/uh1OR5Zzv13ovHWuFmeP3KE\n1uglpNFkhNLRo7ArGggsDA4Z8JF0TXfmLwl6JG6taDw25nMNpxm0pTRvGQcbOb0R\n1nG6eMepAY+9LYLgdB4XaGvZhabyBYvs9YIyTsIUGFgvfNWyy/LCrkw5e4RoSsbZ\nVSytiZo/AgMBAAECggEAQ/RB5+PwvrtY+szSxMHaHtJSXHokCHStgCydvVBClkEC\nXj2S1hBhtW/88P6bIgNja9q5EpJHhPbb3j6UxtChxjo5+Pcx5idr2wT1bFzMhiME\nzKHDBYFhBFJY5TVzHsCSZPK9WtLhunGKaleznoFCVkdVGe+EzoMTxBDWC2lGgI1b\nuDzrBb6V80VzdovUFk0KQOTREnCXSQDTsYfyX6qIx71rFD/MtPIoTnAwCON7Pv9v\nco9zsFqVlFWbtyW6pBveyVpGHl6UCi+OLiGCQJmtXWQKqjdKb0CYgUd+deaBOYkP\njYmwBPD+ZoIDFQ0CjBThSppOLiFVlkRv8Cegw//ggQKBgQDT/VOXIyFsnXaDbC7n\ndXcNK6ixZArN56KhXWAjVgdByuxFUFxxgyaG+o5f8maHNCZ9Ft30io8xsxVKViha\n/CPuh0SXYDscLxaw8JW5mYKfWCgTxzPXBZzTASDazbHgnYbQE+nCZDdyWiWMymT/\nE7eFQ47RfxdmMXGUl9JcYq3hzwKBgQC16dV2zlFdIITEzk1aKxi4ysGIz31roDx8\ne0m1Df0EEEbjvGmzM8E8Zk7CwQTKmfoI48MNP4oaYpZqryo24RGI/17i4VBEasWy\nwKdYM4/kkxASOuKquXWnjQOlb2ZC0GfLeyttqJr4p2oI89SK7kOpCqSmm+o73eJA\nhWcYptkMkQKBgGqksQ2CLclfOYSJwtrLm/VzNizvIARPd9/ngnqkR4hQliWUdLzh\n9lrG5yLbZbq0gHxDKatgnQKqjZZU235SA512TQo97d6Szb57eUbiM/UHOzof5zNP\nboIzuhx4h/hwJqa8rccN9VrAgM1f8AjmGVegEdPQNKxDSVkwOzIgrkq/AoGADadi\nbUtpEftZ28e8SJNJhL07L4CbYlOhlppOWveU0RRDrd47dMbirxzitn10VZyfBsHJ\npxnozLgvoAxLt9jGzyiTv6W3t5roAdWx+c3M9BQRtbyTvMq0yQGtj2JAI62uzLgO\n92kbUKSIMenTPyZJD8wLtbGoMBwkWkFpDpGfYvECgYAT9fwlSA6oiNnsC2j98MAc\nIV2lO1cPgggDKlqiz7dSFfmdvcYk2+Gj2vwdSyXurIrMu6KElUG43yDNqHl1TmBl\nUM3ESIjPnMbYU6Cl/iK9Iq3f73Dhc5zoYJW7elTE3La/W7BqW9ezKmKFgrlYAMLo\nCCX66hF0sAVccmJ4bw4pqg==\n-----END PRIVATE KEY-----\n'
//   }),
//   databaseURL: 'https://back2-2f39f.firebaseio.com'
// });

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

# csci2720_project

Shum Hiu Tung (1155063707)
Suen Ka Leong (1155062592)
So Hon Chuen (1155062753)
  
## Project Requirement

### User (So Hon Chuen, Shum Hiu Tung) - done
| Requirement | Progress |
|--|--|
| 1. SignUp + Login | Done |
| 2. List event in table (allow sorting) | Done |
| 3. Search by one field | Done |
| 4. Separate view of a event: detail + comment(non-threaded) | Done |
| 5. Add event to favourite + see list in another view | Done |
| 6. See user name in top right corner + Logout | Done |

### Admin (Suen Ka Leong, Shum Hiu Tung) - done
| Requirement | Progress |
|--|--|
| 1. Flush Data | Done |
| 2. CRUD event data | Done |
| 3. CRUD user data | Done |
| 4. Load CSV | Done |
| 5. Logout | Done |

### Non-user (Shum Hiu Tung) - done
| Requirement | Progress |
|--|--|
| 1. Login + SignUp | Done |
| 2. Login as admin | Done |


## Project setup
```
npm install
```

## 1. Vue.js Part:

### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 2. Node.js Part:
### run
```
node server/server.js
```
### hot-reloads
```
nodemon server/server.js
```


## Design of data schemas and models of your database

There are three collections in the database: event, user, comment:
	
	user (String username, String email, Array favEvents)
	event (String title, String datetime, String organization, String venue, String district)
	comment (String username, String eventID, String comment, String timestamp)

For user password, it is saved in the Authenication of the Firebase. The password is automaticaly hashed by Firebase.

## Technologies and frameworks/libraries in use

Node.js Express

Vue.js Vuetify.js

	Advantages: 
		- the coding is simplier than Angular
		- the size is smaller than Angular
	Disadvantages: 
		- a new frameworks with not much resources in the Internet
		- WE DIDN'T LEARN VUE.JS IN CLASS, use more time to learn

Firebase

	Advantages: 
		- Authenication of the application can be easily done
		- Great GUI of the database console
	Disadvantages: 
		- does not provide high performance like MongoDB
		- there is daily usage limit (50K read operations)
		- Firebase Admin SDK only support some programming language, that's why we need an extra Node.js server


# csci2720_project

  
## Project Requirement

### User (So Hon Chuen, Shum Hiu Tung)
| Requirement | Progress |
|--|--|
| 1. SignUp + Login | **Need testing** |
| 2. List event in table (allow sorting) | **Need testing** |
| 3. Search by one field | **Need testing** |
| 4. Separate view of a event: detail + comment(non-threaded) |  |
| 5. Add event to favourite + see list in another view |  |
| 6. See user name in top right corner + Logout | **Need testing** |

### Admin (Suen Ka Leong, Shum Hiu Tung)
| Requirement | Progress |
|--|--|
| 1. Flush Data | **Need testing** |
| 2. CRUD event data | **Need testing** |
| 3. CRUD user data | **Need testing** |
| 4. Load CSV | **Need testing** |
| 5. Logout | **Need testing** |

### Non-user (Shum Hiu Tung)
| Requirement | Progress |
|--|--|
| 1. Login + SignUp | **Need testing** |
| 2. Login as admin | **Need testing** |


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
## run
```
node server/server.js
```
## hot-reloads
```
nodemon server/server.js
```


3. Design of data schemas and models of your database

There are two collections in the database: event, user

user(String username, String email, Array favEvents)

event(String title, String datetime, String organization, String venue, String district)

For user password, it is saved in the Authenication of the Firebase. The password is automaticaly hashed by Firebase.

4. Technologies and frameworks/libraries in use

Node.js Express

Vue.js Vuetify.js

	Advantages: - the coding is simplier than Angular

				- the size is smaller than Angular

	Disadvantages: - a new frameworks with not much resources in the Internet

				   - WE DIDN'T LEARN VUE.JS IN CLASS, use more time to learn

Firebase

	Advantages: - Authenication of the application can be easily done

				- Great GUI of the database console

	Disadvantages: - does not provide high performance like MongoDB
	
				   - Firebase Admin SDK only support some programming language, that's why we need an extra Node.js server

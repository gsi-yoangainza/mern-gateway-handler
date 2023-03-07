<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

> Gateway Handler is a MERN App dedicated to manage gateways data and it's corresponding peripherals

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/amazingandyyy/mern.git
$ yarn # or npm i
```

## project structure
```terminal
README.md
package.json
.env (to create .env, check [prepare your secret session])
backend

client/
   package.json
   .env
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd frontend          // go to frontend folder
$ npm i              // npm install packages
$ cd ..             // go back to the root folder of the project
$ npm run start        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
```

## Server-side usage(PORT: 8000)


### Prepare you MongoDB URI

(You need to add a MONGO_URI in .env to connect to MongoDB)

`MONGO_URI=<YOUR_MONGO_URI>`  in src/.env
(This is provided by your mongoDB account)

```
MONGO_URI:  mongodb+srv://<user>:<password>@cluster0.vf2mool.mongodb.net/app?retryWrites=true&w=majority
```

### Prepare your secret

(You need to add a JWT_SECRET in .env to connect to MongoDB)

`JWT_SECRET=YOUR_JWT_SECRET`  in src/.env


## Deploy Server locally
This command will install all dependencies of both projects(frontend and backend) and then start the backend server

```terminal
$ npm run deploy   //in the root folder
```

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

Email Me: youstrauss91@gmail.com (welcome, say hi)

## Author
[youstrauss91](https://amazingandyyy.com)


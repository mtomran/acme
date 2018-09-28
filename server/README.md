# ACME REST API
ACME REST API is a [Node.js](https://nodejs.org/) and [Express](http://expressjs.com/) based web-service providing end-points for manipulating device info/state. It also uses web-sockets (using socket.io package) to notify connected clients of any updates in device info/state.

## How to use
The ACME REST API can be used be calling available end-points.
To see full documentation of the API visit http://localhost:8080/server/apidoc/index.html.

## Tests
To run tests make sure docker containers are running and run 

    docker-compose exec server npm test

Tests are running on [Mocha](https://mochajs.org/) test framework using [Chai](https://www.chaijs.com/) and [supertest](https://www.npmjs.com/package/supertest) assertion libraries.

## TODO
- add proper validation for routes
- add a jwt token based authentication
- implement automated tests
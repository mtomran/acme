# ACME Cloud Platform
ACME is a cloud platform that allows intelligent devices such as cars, thermostats, home appliances, and industrial machines to interconnect in the cloud. This application is a subset of ACME application that stores device state in the cloud and provides a REST API to perform CRUD operations on the stored data.
It also provides a GUI to view device info/state and a simulator to manipulate device info/state.

## Installation
### Prerequisites:
- docker
- docker-compose (for installation instruction visit [here](https://docs.docker.com/compose/install))

### Clone repository:
    git clone https://github.com/mtomran/acme.git
    
### Build and run:
    cd ./acme
    docker-compose up -d --build

## How to use
Navigate to http://localhost:8080 in a web-browser to view the landing page.

From the landing page, press `Devices` to view the list of devices or press `Simulator` to view the device manipulation page where you can add, edit, delete, and view devices.

## Services
The application is comprised of 4 services:
1. [www](www/README.md): Front-End logic of the application using Angular v6 and Angular-CLI.

2. [server](server/README.md): Back-End logic of the application using Node.js.

3. [db](db/README.md): MongoDB v4 Database.
4. [proxy](proxy/README.md): NGINX proxy server to route requests to the back-end or the front-end services.

## Data Volume
Device information is stored in MongoDB that runs in `db` service.
Please note that to prevent polluting the host in case you are just trying the application, no mapped data volume is added to the docker-compose.yml file. As a result, every time `db` docker container is recreated, the data volume will reset to empty.
If you wish to make a persistent data volume, add the following section to the `db` service in the docker-compose file

    volumes:
      - /path/on/host:/data/db

## Running Tests
to run automated tests, run 
    
    ./test.sh

this will run both front-end and back-end tests.
### Running Front-End Tests
To run the front-end tests only, run

    cd www && ng test --watch=false && ng e2e

Note: for the front-end tests to run, npm package manager must be installed on the host and all packages should be installed directly on the host machine. Also, [Angular CLI 6](https://github.com/angular/angular-cli/wiki) is required for running the tests.

### Running Back-End Tests
To run the back-end tests only, run

    docker-compose exec server npm test

Note: back-end tests are running inside the `server` docker container. Therefore, docker containers must be running.

## Testing Approaches
Currently, given the time limit and size of the application, 
only API tests in the back-end and some unit tests in the front-end are implemented.

More testing would be required as the application becomes more complex.
### Back-End Testing Approaches

#### API Testing
At the moment, API tests only verify minimal requirement for each end-point. However, when proper input validation and user authorization/authentication is 
in place, more tests should be added to verify those requirements as well.

#### Unit Testing
In a more complex application, testing data retrieval and response preparation logic should be done separately. In such case, unit testing is inevitable to efficiently debug issues.

#### Load Testing
For applications that require a certain throughput, load tests should run periodically to ensure requirements are met as changes are made in the application. Tools such as [Artillery](https://artillery.io/), [Apache ab](http://httpd.apache.org/docs/2.4/programs/ab.html), and [wrk](https://github.com/wg/wrk) can be used for load testing and benchmarking the application end-points.

### Front-End Testing Approaches
Angular framework provides excellent tools for unit and integration testing.

#### Unit Testing
Angular uses [Jasmine](https://jasmine.github.io/) testing framework and [Karma](https://karma-runner.github.io/2.0/index.html) test runner to provide a tool for testing each component/service independently. Few tests are already implemented for device and simulator components.

#### E2E Testing
Angular uses [Jasmine](https://jasmine.github.io/) testing framework and [Protractor](https://github.com/angular/protractor) test runner to provide a tool to test the application in a real browser as a user would. This approach should be used for full integration testing of the platform.

#### Load Testing
We may need to meet certain requirements in terms of number of concurrent clients and request that the front-end service should be able to handle. To
ensure those requirements are satisfied as development continues, we would need
to use load test tools such as [WebLOAD](https://www.radview.com/) and [JMeter](http://jmeter.apache.org/).

### Simulator Application
Various approaches could be incorporated for testing REST API end-points. One way, which has already been implemented for the ACME application, is developing REST API tests using existing testing frameworks such as [Mocha](https://mochajs.org/). A benefit of such tool is tests can run many times and be used in automated testing. One could use command-line tools such as [curl command](https://www.baeldung.com/curl-rest) to simulate HTTP calls to the API. However, these approaches require technical background which not all people conducting the tests have. To let people with less technical experience also interact with the ACME application, a web-based simulator application has been developed. The simulator, not only helps developers simulate device data manipulation and sensor status updates, but also helps end-users test the system and help finding bugs and boundary cases by using the appliction the way they think it should work.

### Scalability
In order to scale the application to be able to handle high volume of devices,
there are few places that require revision.

#### Deployment
Since services of ACME application are running inside docker containers,scaling the services are very easy. With tools such as [Kubernetes](https://kubernetes.io/) and [Docker Swarm](https://docs.docker.com/engine/swarm/) one can run multiple instances 
of a container in no time. A load-balancer such as NGINX (already in place) is needed to route requests to containers in service.

#### Database
A major bottleneck in the ACME application is communications to/from the DB. Depending on the number of devices and the rate of updates, a single DB may not be able to handle requests as fast as required. In such case, a clustered DB need to be used.

#### Back-End Design
As the number of devices increase, it is not practical for the get request to load all devices at once. In such case, users can only load either a single or a paginated subset of devices. this helps reduce the load when front-end clients load the page.

In order to be be able to scale the `server` docker service, some modifications should be done to the `socket.io` configuration for it to work as intended. First, socket information need to be stored in a shared space using [socket-io-redis](https://github.com/socketio/socket.io-redis) adaptor so all instances of the process can access it. Also, if long-polling is used for socket transports, a sticky load-balancing mechanism should be used in NGINX for proper client-server data-transfer. Another option is to only use `websocket` transport.

#### Front-End Design
Similar to the back-end design, if the total number of devices are high, it is not practical to load all device data to the DOM. To resolve the issue, the front-end table should use pagination of data in which only one or few pages of device data is pre-loaded at each time. To view data in other pages, new requests should be sent to the back-end.


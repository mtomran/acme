# ACME Cloud Platform
ACME is a cloud platform that allows intelligent devices such as cars, thermostats, home appliances, and industrial machines to interconnect in the cloud. This application is a subset of ACME application that stores device state in the cloud and provides a REST API to perform CRUD operations on the stored data.
It also provides a GUI to view device info/state and a simulate device info/state changes.

## Installation
### prerequisites:
- docker
- docker-compose (for installation instruction visit [here](https://docs.docker.com/compose/install))

### Clone repository:
    git clone https://github.com/mtomran/acme.git
    
### Build and run:
    cd ./acme
    docker-compose up -d --build

## How to use
Navigate to http://localhost:8080 in a web-browser to view the landing page.

From the landing page, press `Devices` to view the list of devices or press Simulator to view the device manipulation page where you can add, edit, delete, and view devices.

## Services
The application is comprised of 4 services
1. [www](www/README.md): Front-End logic of the application using Angular v6 and Angular-CLI.

2. [server](server/README.md): Back-End logic of the application using Node.js.

3. [db](db/README.md): MongoDB v4 Database.
4. [proxy](proxy/README.md): NGINX proxy server to route requests to the back-end or the front-end services.

## Tests
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

## Data Volume
Device information is stored in MongoDB that runs in `db` service.
Please note that to prevent polluting the host in case you are just trying the application, no mapped data volume is added to the docker-compose.yml file. As a result, every time `db` docker container is recreated, the data volume will reset to empty.
If you wish to make a persistent data volume, add the following section to the `db` service in the docker-compose file

    volumes:
      - /path/on/host:/data/db
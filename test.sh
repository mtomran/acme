#!/bin/bash
cd www && ng test --watch=false && ng e2e
docker-compose up -d
docker-compose exec server npm test

FROM node:8.12.0

RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

## script to wait for other services to start
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 8000
# waiting for db to start
# starting the server which watching for file changes
CMD /wait-for-it.sh db:27017 --timeout=0 -- nodemon -L --exec npm start
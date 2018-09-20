FROM node:8.12.0

RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD [ "npm", "start" ]
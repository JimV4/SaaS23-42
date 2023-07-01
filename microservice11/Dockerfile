FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3010  

VOLUME /usr/src/app/public

CMD [ "npm", "start" ]
FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY --chown=node:node package*.json ./

USER node

#for proxy ssl certificate
RUN npm config set registry http://registry.npmjs.org/

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

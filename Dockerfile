FROM node:slim

ENV NODE_ENV production

WORKDIR /expressAPI

COPY . .

RUN npm install

CMD [ "node", "index.js"]

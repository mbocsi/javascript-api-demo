# JavaScript API Demo

A RESTful API made using express.js. This is a demo project for gathering experience in making backends in JavaScript. Works with the api-demo-frontend.

## Running the server for dev

`node .`

## Building a docker image

`docker build --platform linux/amd64 -t mbocsi/expressapi .`

## Running the docker container

`docker run -p 8080:8080 mbocsi/expressapi`

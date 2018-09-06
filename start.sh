#!/bin/bash
pm2 delete xzykt
pm2 delete xzykt-api
NODE_PATH="./src" NODE_ENV=production PORT=3000 APIPORT=80 pm2 start ./bin/server.js -n xzykt
NODE_PATH="./api" NODE_ENV=production APIPORT=30002           pm2 start ./bin/api.js -n xzykt-api

#pm2 delete xianzhi-platform
#pm2 delete xianzhi-platform-api
#NODE_PATH="./src" NODE_ENV=production PORT=3000 APIPORT=30001 pm2 start ./bin/server.js -n xianzhi-platform
#NODE_PATH="./api" NODE_ENV=production APIPORT=30002           pm2 start ./bin/api.js -n xianzhi-platform-api

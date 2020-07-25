const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const carsRouter = require('../cars/cars-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/cars', carsRouter)

server.get('/', (req, res, next) => {
  res.status(200).json({api: "up and running"})
})

module.exports = server;

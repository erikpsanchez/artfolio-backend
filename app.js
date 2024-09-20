require('module-alias/register');
const express = require('express');
const app = express();
const env = require('./config/env');
const cors = require('cors');
const { CustomError, ResponseError } = require('./utils');

global.CustomError = CustomError;

app.use(ResponseError);

app.use(
  cors({
    origin: process.env.ARTFOLIO_FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization',
  );
  next();
});

app.use(express.json());

// Database models
const models = require('./src/models');

// Routes
require('./src/api')(app);

module.exports = app;

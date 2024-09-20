'use strict';

const LoggerHelper = require('./logger-helper');
const Response = require('./response');

module.exports = (req, res, next) => {
  res.jsonError = function (error, message) {
    LoggerHelper(error);

    let status = error && error.status ? error.status : 500;
    let cMessage =
      error && error instanceof CustomError
        ? error.message
        : undefined;
    let errors =
      error && error instanceof CustomError && error.errors
        ? error.errors
        : undefined;
    let name =
      error && error instanceof CustomError && error.name
        ? error.name
        : 'Error';

    // data, status, name, message, details
    let response = new Response(
      null,
      status,
      name,
      cMessage || message,
      errors,
    );

    res.status(status).json(response.getMessage());
  };

  next();
};

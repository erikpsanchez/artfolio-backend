'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

const getFoldersAndFiles = (defaultForlderName) => {
  let files = [];

  fs.readdirSync(__dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .forEach((folderName) => {
      if (
        !fs.existsSync(
          `${__dirname}/${folderName}/${defaultForlderName}`,
        )
      ) {
        return [];
      }

      return fs
        .readdirSync(
          `${__dirname}/${folderName}/${defaultForlderName}`,
        )
        .forEach((file) => {
          files.push({ name: folderName, file });
        });
    });

  return files;
};

module.exports = (app) => {
  getFoldersAndFiles('routes').forEach((folder) => {
    if (
      folder['file'].indexOf('.') !== 0 &&
      folder['file'].slice(-3) === '.js'
    ) {
      const {
        routes,
      } = require(`${__dirname}/${folder['name']}/routes/${folder['file']}`);
      routes.forEach((route) => {
        const { method, path, middleware, action } = route;

        let newRoute = null;

        if (middleware) {
          let applyMiddleware = Array.isArray(middleware)
            ? middleware
            : [middleware];

          newRoute = router[method](path, ...applyMiddleware, action);
        } else {
          newRoute = router[method](path, action);
        }

        app.use('/', newRoute);
        // console.log(`Route => ${method.toUpperCase()} ${path}`);
      });
    }
  });
};

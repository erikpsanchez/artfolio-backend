'use strict';

const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const dotenvFilePath = path.resolve(process.cwd(), '.env');
const AF = /^ARTFOLIO_/i;

const loadEnvFile = () => {
  if (fs.existsSync(dotenvFilePath)) {
    console.log("Loading .env file");
    dotenv.config({ path: dotenvFilePath });
  } else {
    // En producción, las variables de entorno se deben establecer directamente
    if (process.env.NODE_ENV !== 'production') {
      console.warn(".env file not found, but proceeding. Make sure environment variables are set.");
    }
  }
};

// Solo cargar el archivo .env si no estamos en producción
if (process.env.NODE_ENV !== 'production') {
  loadEnvFile();
}

const env = Object.keys(process.env)
  .filter((key) => AF.test(key))
  .reduce((acc, current) => {
    acc[current] = process.env[current];
    return acc;
  }, {});

module.exports = env;

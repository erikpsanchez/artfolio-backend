'use strict';

const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const dotenvFilePath = path.resolve(process.cwd(), '.env');

const AF = /^ARTFOLIO_/i;

const validateEnvFile = async () => {
    try {
        if (fs.existsSync(dotenvFilePath)) {
            dotenv.config({ path: dotenvFilePath });
        }else{
            throw new Error(".env NOT FOUND")
        }
    } catch (error) {
        throw new Error(".env NOT FOUND")
    }
}

validateEnvFile()

const env = Object.keys(process.env)
    .filter((key) => AF.test(key))
    .reduce(
        (acc, current) => {
            acc[current] = process.env[current];
            return acc;
        },{}
    );

module.exports = env;

"use strict";

const { Sequelize, Op } = require("sequelize");
require("../config/sequelize-extras");
const pg = require("pg");
// const logger = require('../utils/logger');

// const logFunc = (msj) => logger.verbose(msj);

let config = {
  use_env_variable: process.env.ARTFOLIO_DATABASE_URL,
  username: process.env.ARTFOLIO_DATABASE_USERNAME ?? "postgres",
  password: process.env.ARTFOLIO_DATABASE_PASSWORD ?? "root",
  database: process.env.ARTFOLIO_DATABASE_NAME ?? "db_artfolio",
  host: process.env.ARTFOLIO_DATABASE_HOST ?? "127.0.0.1",
  port: process.env.ARTFOLIO_DATABASE_PORT ?? 5432,
  dialect: "postgres",
  dialectModule: pg,
  logging_db:
    process.env.ARTFOLIO_DEBUG == "true" || process.env.ARTFOLIO_DEBUG == true,
};

config.operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

let sequelize;
config.timezone = "-06:00";
config.logging =
  config.logging_db == true || config.logging_db == null
    ? process.env.ARTFOLIO_DEBUG == "true" || process.env.ARTFOLIO_DEBUG == true
      ? console.log
      : logFunc
    : undefined;
config.logQueryParameters =
  config.logging_db != null ? config.logging_db : true;
config.dialectOptions = {
  charset: "utf8mb4",
  timezone: "local",
};

if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

module.exports = sequelize;

'use strict';
const logger = require('@utils/logger');

const logError = (error) => {
  if (
    process.env.ARTFOLIO_DEBUG === true ||
    process.env.ARTFOLIO_DEBUG === 'true'
  ) {
    console.log(error);
  } else {
    if (error) {
      // && !(error instanceof CustomError)
      // TODO: Guardar logs en archivos diarios. https://www.npmjs.com/package/winston
      logger.error(error);
    }
  }
};

module.exports = logError;

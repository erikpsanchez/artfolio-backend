const { format, createLogger, transports } = require('winston');
const { combine, label, json, errors, timestamp, printf } = format;
require('winston-daily-rotate-file');

//Label
const CATEGORY = 'STALog';

const fileRotateTransportError = new transports.DailyRotateFile({
  level: 'error',
  filename: 'logs/error-rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const fileRotateTransportWarn = new transports.DailyRotateFile({
  level: 'warn',
  filename: 'logs/warn-rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const fileRotateTransportInfo = new transports.DailyRotateFile({
  level: 'info',
  filename: 'logs/info-rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const fileRotateTransportHttp = new transports.DailyRotateFile({
  level: 'http',
  filename: 'logs/http-rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

// const fileRotateTransportDebug = new transports.DailyRotateFile({
//   level: 'debug',
//   filename: 'logs/debug-rotate-%DATE%.log',
//   datePattern: 'YYYY-MM-DD',
//   maxFiles: '14d',
// });

// const fileRotateTransportSilly = new transports.DailyRotateFile({
//   level: 'silly',
//   filename: 'logs/silly-rotate-%DATE%.log',
//   datePattern: 'YYYY-MM-DD',
//   maxFiles: '14d',
// });

const fileRotateTransportVerbose = new transports.DailyRotateFile({
  level: 'verbose',
  filename: 'logs/verbose-rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    label({ label: CATEGORY }),
    errors({ stack: true }),
    json(),
  ),
  transports: [
    fileRotateTransportError,
    fileRotateTransportWarn,
    fileRotateTransportInfo,
    fileRotateTransportHttp,
    // fileRotateTransportDebug,
    // fileRotateTransportSilly,
    fileRotateTransportVerbose,
    // new transports.Console()
  ],
});

module.exports = logger;

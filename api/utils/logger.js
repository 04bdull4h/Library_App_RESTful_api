const winston = require('winston');
const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: 'info',
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'api/logs/log.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: 'audit log',
    }),
    winston.format.timestamp({
      format: 'DD-MM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf(
      (info) =>
        `${info.level}, ${info.label}, ${[info.timestamp]}, ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);
module.exports = logger;

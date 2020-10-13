import express from 'express';
import winston from 'winston';

const app = express();
app.use(express.json());

const { label, combine, printf, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-log.log' }),
  ],
  format: combine(label({ label: 'my-app' }), timestamp(), myFormat),
});

logger.error('Error log');
logger.warn('warn log');
logger.info('info log');
logger.verbose('verbose log');
logger.debug('debug log');
logger.silly('silly log');
logger.log('info', 'Hello with parameter!');

app.listen(3000, () => {
  console.log('API Started');
});

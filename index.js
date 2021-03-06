import mongoose from 'mongoose';
import util from 'util';
import config from './config/env';
import app from './config/express';

const debug = require('debug')('url-app:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
// use bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    debug(`URL app started on port ${config.port} (${config.env})`);
  });
}

export default app;

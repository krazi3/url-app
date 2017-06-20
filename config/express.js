import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from '../app/routes/index.route';
import config from './env';

var app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

app.use('/', routes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500)
  res.json(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404)
  res.json('404');
});

export default app;

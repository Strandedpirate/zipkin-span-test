const {Tracer, ExplicitContext, ConsoleRecorder} = require('zipkin');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const appName = require('./app/core/constants');

var express = require('express'),
  config = require('./config/config');

const ctxImpl = new ExplicitContext();
const recorder = new ConsoleRecorder();

const tracer = new Tracer({ctxImpl, recorder}); // configure your tracer properly here

var app = express();

// add the Zipkin middleware
app.use(zipkinMiddleware({
  tracer,
  serviceName: appName,
  port: config.port,
}));

app.use((req, res, next) => {
  // inject tracer into req for DI
  req.tracer = tracer;

  next();
});

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


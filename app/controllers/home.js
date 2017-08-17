var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

const createFetch = require('../core/createFetch');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  const tracer = req.tracer;
  const fetch = createFetch(tracer, 'some-url');
  fetch('https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin-instrumentation-express')
    .then(a => {
      console.log(a.status);
    })
    .catch(e => {
      console.error(e);
    });

  var articles = [new Article(), new Article()];
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: articles
  });
});

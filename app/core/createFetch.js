const fetch = require('node-fetch');
const wrapFetch = require('zipkin-instrumentation-fetch');

const appName = require('../core/constants');

const createFetch = (tracer, remoteServiceName) => {
  return (url, options) => {
    return wrapFetch(fetch, {tracer, serviceName: appName, remoteServiceName})(url, options);
  };
};

module.exports = createFetch;

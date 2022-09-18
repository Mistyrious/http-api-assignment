const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  'text/html': {
    '/': htmlHandler.getIndex,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound,
  },
  'text/css': {
    '/style.css': htmlHandler.getStyle,
    notFound: htmlHandler.notFound,
  },
  'application/json': {
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound,
  },
  'text/xml': {
    '/success': xmlHandler.success,
    '/badRequest': xmlHandler.badRequest,
    '/unauthorized': xmlHandler.unauthorized,
    '/forbidden': xmlHandler.forbidden,
    '/internal': xmlHandler.internal,
    '/notImplemented': xmlHandler.notImplemented,
    notFound: xmlHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  for (let i = 0; i < acceptedTypes.length; i++) {
    if (urlStruct[acceptedTypes[i]]) {
      if (urlStruct[acceptedTypes[i]][parsedUrl.pathname]) {
        return urlStruct[acceptedTypes[i]][parsedUrl.pathname](request, response, params);
      }
    }
  }
  return urlStruct['application/json'].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});

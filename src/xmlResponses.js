const respondXML = (request, response, status, content) => {
  response.writeHead(status, {
    'Content-Type': 'text/xml',
  });
  response.write(content);
  response.end();
};

const success = (request, response) => {
  const responseXML = '<response><message>This is a successful response</message></response>';

  return respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  let responseXML = '<response><message>This request has the required parameters</message></response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, responseXML);
  }
  return respondXML(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  let responseXML = '<response><message>Authorized to access</message></response>';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseXML = '<response><message>Not logged in</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, responseXML);
  }
  return respondXML(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  const responseXML = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';

  return respondXML(request, response, 403, responseXML);
};

const internal = (request, response) => {
  const responseXML = '<response><message>Internal server error. Something went wrong</message><id>internalServerError</id></response>';

  return respondXML(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  const responseXML = '<response><message>A get request for this page has not been implemented</message><id>notImplemented</id></response>';

  return respondXML(request, response, 501, responseXML);
};

const notFound = (request, response) => {
  const responseXML = '<response><message>The page you are looking for was not found</message><id>notFound</id></response>';

  return respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

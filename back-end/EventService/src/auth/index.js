const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${global.gConfig.auth0_domain}/.well-known/jwks.json`
  }),
  audience: global.gConfig.auth0_audience,
  issuer: `https://${global.gConfig.auth0_domain}/`,
  algorithms: ["RS256"]
});

module.exports = checkJwt;

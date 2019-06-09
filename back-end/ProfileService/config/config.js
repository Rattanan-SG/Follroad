require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    config_id: "development",
    node_port: 3001,
    jwksUri: "https://sanguo.auth0.com/.well-known/jwks.json",
    audience: "https://www.follroad.tk/api/",
    issuer: "https://sanguo.auth0.com/"
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: 3001
  },
  production: {
    config_id: "production",
    node_port: process.env.PORT || 3001,
    jwksUri: process.env.JWKSURI,
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER
  }
};

module.exports = config[env];

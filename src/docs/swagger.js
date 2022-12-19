const {
  version,
  author,
  bugs,
  license,
  name,
  description,
} = require("../../package.json");
const { rootUrl, port, environment } = require("../config");

const swaggerDef = {
  openapi: "3.0.3",
  info: {
    title: name,
    version: "v" + version,
    description: description,
    contact: {
      name: author,
      email: bugs.email,
      url: "https://www.getikitsune.com",
    },
    license: {
      name: license,
      url: "https://opensource.org/licenses/BSD-3-Clause",
    },
  },
  servers: [
    {
      url:
        environment === "development"
          ? `${rootUrl}:${port}/v1`
          : `${new URL(rootUrl).origin}/v1`,
      description: `${environment} server`,
    },
  ],
};

module.exports = swaggerDef;

/*
 * ################################################################################
 * # File: docs.route.js
 * # Project: kit-proxy-api-service
 * # Project Version: 2.0.1
 * # File Created: Monday, 6th September 2021 1:46:35 pm
 * # Author: Devesh Kumar (devesh.kumar@nowfloats.com)
 * # -----
 * # Last Modified: Monday, 6th September 2021 1:47:28 pm
 * # Modified By: Devesh Kumar (devesh.kumar@nowfloats.com)
 * # -----
 * # Copyright 2021 - 2021 (c) NowFloats Technologies Pvt. Ltd.
 * ################################################################################
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = require("../../docs/swagger");
const { favicon, logo, materialUiCss } = require("../../constants");

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/docs/*.yml", "src/routes/v1/*.js"],
});

const swaggerUiOptions = {
  swaggerOptions: {
    validatorUrl: null,
  },

  // customfavIcon: "../../../images/favicon.ico",
  customfavIcon: favicon,
  customSiteTitle: "NFS API Service",
  customCss: `
        .swagger-ui .topbar {background-color: #000;}
        .topbar-wrapper img[alt="Swagger UI"], .topbar-wrapper span { visibility: collapse;}
        .topbar-wrapper .link:after { content: url(${logo}); height: 40px !important; display: flex; }
        .swagger-ui .info .title small {background: #f06428; margin: 0 0 0 14px; top: 10px;}
        .swagger-ui .btn.authorize {color: #f06428; border-color: #f06428}
        .swagger-ui .btn.authorize svg {fill: #f06428;}
        .swagger-ui .info a {color: #f06428;}
    `,
  customCssUrl: materialUiCss,
};

// swaggerThemes.loadTheme("material", swaggerUiOptions);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(specs, swaggerUiOptions));

module.exports = router;

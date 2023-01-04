const httpStatus = require("http-status");
const fs = require("fs");
const ApiError = require("../apiError.util");

var readHTMLFile = function (path) {
  console.log("path->", path);
  try {
    return fs.readFileSync("./invitation.template.handlebars", {
      encoding: "utf-8",
    });
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Email template not found"
    );
  }
};

const InvitationHTML = function () {
  return readHTMLFile("../email-templates/invitation.template.handlebars");
};

module.exports = {
  InvitationHTML,
};

const handlebars = require("handlebars");

const {
  reset_password_link,
  verification_email_link,
  change_password_link,
} = require("../config");
const { sendEmail } = require("../utils");
const {
  resetPasswordHTML,
  emailVerificationHTML,
  changePasswordHTML,
} = require("../utils/email-templates");
const { envConst } = require("../constants");

/**
 * Send reset password email
 * @param {string} host
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (host, to, token, next) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${host}${reset_password_link}?${envConst.token}=${token}`;
  var template = handlebars.compile(resetPasswordHTML());
  var htmlToSend = template({ resetPasswordUrl: resetPasswordUrl });

  const options = {
    email: to,
    subject: subject,
    htmlToSend: htmlToSend,
  };

  await sendEmail(options, next);
};

const sendChangePasswordEmail = async (host, to, token, next) => {
  const subject = "Change password";
  // replace this url with the link to the reset password page of your front-end app
  const changePasswordUrl = `${host}${reset_password_link}?${envConst.token}=${token}`;
  var template = handlebars.compile(changePasswordHTML());
  var htmlToSend = template({ changePasswordUrl: changePasswordUrl });

  const options = {
    email: to,
    subject: subject,
    htmlToSend: htmlToSend,
  };

  await sendEmail(options, next);
};

/**
 * Send verification email
 * @param {string} host
 * @param {string} to
 * @param {string} token
 * @param {object} user
 * @returns {Promise}
 */
const sendVerificationEmail = async (host, to, token, user, next) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${
    host.startsWith(envConst.localhost) ? envConst.http : envConst.https
  }://${host}${verification_email_link}?${envConst.token}=${token}`;

  var template = handlebars.compile(emailVerificationHTML());
  var htmlToSend = template({ verificationEmailUrl: verificationEmailUrl });

  const options = {
    email: to,
    subject: subject,
    htmlToSend: htmlToSend,
    user: user,
  };

  await sendEmail(options, next);
};

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendChangePasswordEmail,
};

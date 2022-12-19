const nodemailer = require("nodemailer");

const { environment, email, logger } = require("../configs/index.config");
const DBConfigs = require("../configs/db.config");
const db = new DBConfigs();

const EmailErrorHandler = require("./email-error.handler");

const transport = nodemailer.createTransport(email.smtp);

// if (environment != envConst.test) {
//   transport
//     .verify()
//     .then(() => logger.info("Connected to email server 📧 ..."))
//     .catch(() =>
//       logger.warn(
//         "Unable to connect to email server. Make sure you have configured the SMTP options."
//       )
//     );
// }

const createLog = async (requestBody, user, next) =>
  await dbWrapper.createOne(
    emailLog,
    { ...requestBody, createdBy: user ? user.id : null },
    true,
    next
  );

const sendEmail = async (options, next) => {
  const mailOptions = {
    from: email.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    transport.sendMail(mailOptions, function (error, info) {
      var status = "";
      var response = "";

      if (error) {
        status = result.error;
        response = error;
        // createLog(
        //   {
        //     text: options.htmlToSend,
        //     from: email.from,
        //     to: options.email,
        //     status: status,
        //     response: response,
        //   },
        //   options.user,
        //   next
        // );
        EmailErrorHandler(error, next);
      } else {
        status = result.success;
        response = info.response;
        next();
      }

      const log = {
        text: options.htmlToSend,
        from: email.from,
        to: options.email,
        status: status,
        response: response,
      };
      // createLog(log, options.user, next);
      resolve(null);
    });
  } catch (ex) {
    //console.log(ex.message);
    EmailErrorHandler(ex, next);
    resolve(null);
  }
};

module.exports = sendEmail;

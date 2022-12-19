require("dotenv").config({ path: "./.env" });

module.exports = {
  inviteLink: process.env.inviteLink,
  email: {
    smtp: {
      port: process.env.EMAIL_PORT || 465,
      secure: process.env.EMAIL_SECURE === "true" ? true : false,
      timeout: process.env.EMAIL_TIMEOUT || 10000,
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    },
    from: process.env.MAIL_USERNAME || "no-reply@nfs.tools",
  },
};

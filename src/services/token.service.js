// const httpStatus = require("http-status");
// const jsonwebtoken = require("jsonwebtoken");
// const moment = require("moment");

// const ApiError = require("../utils/apiError.util");
// const userService = require("./user.service");
// const { jwt, tokenConfig } = require("../config");
// const { Token } = require("../models");

// /**
//  * Generate token
//  * @param {ObjectId} userId
//  * @param {Moment} expires
//  * @param {string} type
//  * @param {string} [secret]
//  * @returns {string}
//  */
// const generateToken = (userId, expires, type, secret = jwt.secret) => {
//   const payload = {
//     sub: userId,
//     iat: moment().unix(),
//     exp: expires.unix(),
//     type,
//   };
//   return jsonwebtoken.sign(payload, secret);
// };

// /**
//  * Save a token
//  * @param {string} token
//  * @param {ObjectId} userId
//  * @param {Moment} expires
//  * @param {string} type
//  * @param {boolean} [blacklisted]
//  * @returns {Promise<Token>}
//  */

// /**
//  * Verify token and return token doc (or throw an error if it is not valid)
//  * @param {string} token
//  * @param {string} type
//  * @returns {Promise<Token>}
//  */
// // const verifyToken = async (token, type, next) => {
// //   const payload = jsonwebtoken.verify(token, jwt.secret);
// //   const tokenDoc = await dbWrapper.getOne(
// //     Token,
// //     { token, type, user: payload.sub, blacklisted: false },
// //     null,
// //     true,
// //     next
// //   );
// //   return tokenDoc;
// // };

// /**
//  * Generate auth tokens
//  * @param {User} user
//  * @returns {Promise<Object>}
//  */
// const generateAuthTokens = async (user, next) => {
//   const accessTokenExpires = moment().add(
//     jwt.accessExpirationMinutes,
//     "minutes"
//   );
//   const accessToken = generateToken(
//     user.id,
//     accessTokenExpires,
//     tokenConfig.tokenTypes.ACCESS
//   );

//   const refreshTokenExpires = moment().add(jwt.refreshExpirationDays, "days");
//   const refreshToken = generateToken(
//     user.id,
//     refreshTokenExpires,
//     tokenConfig.tokenTypes.REFRESH
//   );
//   await saveToken(
//     refreshToken,
//     user.id,
//     refreshTokenExpires,
//     tokenConfig.tokenTypes.REFRESH,
//     false,
//     next
//   );

//   return {
//     access: {
//       token: accessToken,
//       expires: accessTokenExpires.toDate(),
//     },
//     refresh: {
//       token: refreshToken,
//       expires: refreshTokenExpires.toDate(),
//     },
//   };
// };

// /**
//  * Generate reset password token
//  * @param {string} email
//  * @returns {Promise<string>}
//  */
// const generateResetPasswordToken = async (email, next) => {
//   const user = await userService.getUserByEmail(email, next);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
//   }
//   const expires = moment().add(jwt.resetPasswordExpirationMinutes, "minutes");
//   const resetPasswordToken = generateToken(
//     user.id,
//     expires,
//     tokenConfig.tokenTypes.RESET_PASSWORD
//   );
//   await saveToken(
//     resetPasswordToken,
//     user.id,
//     expires,
//     tokenConfig.tokenTypes.RESET_PASSWORD,
//     false,
//     next
//   );
//   return resetPasswordToken;
// };

// /**
//  * Generate verify email token
//  * @param {User} user
//  * @returns {Promise<string>}
//  */
// const generateVerifyEmailToken = async (user, next) => {
//   const expires = moment().add(jwt.verifyEmailExpirationMinutes, "minutes");
//   const verifyEmailToken = generateToken(
//     user.id,
//     expires,
//     tokenConfig.tokenTypes.VERIFY_EMAIL
//   );
//   await saveToken(
//     verifyEmailToken,
//     user.id,
//     expires,
//     tokenConfig.tokenTypes.VERIFY_EMAIL,
//     false,
//     next
//   );
//   return verifyEmailToken;
// };

// module.exports = {
//   saveToken,
//   verifyToken,
//   generateToken,
//   generateAuthTokens,
//   generateVerifyEmailToken,
//   generateResetPasswordToken,
// };

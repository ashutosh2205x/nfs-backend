// const catchAsync = require("../utils/ catchAsync.util");

// const forgotPassword = catchAsync(async (req, res, next) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(
//     req.body.email,
//     next
//   );
//   await emailService.sendResetPasswordEmail(
//     req.headers.origin,
//     req.body.email,
//     resetPasswordToken,
//     next
//   );
//   res.status(httpStatus.NO_CONTENT).send();
// });

const ApiError = require("./apiError.util");
const httpStatus = require("http-status");

const EmailErrorHandler = (err, next) => {
  let message = "INTERNAL SERVER ERROR";
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  switch (err.errno) {
    case -3008:
      // Host Not Found
      message = `Email Host not found for ${err.hostname}`;
      break;
    case -4039:
      // Timeout Connecting
      message = `Email Connection Timeout, Reconnect or adjust your port settings`;
      break;
    default:
      message = "INTERNAL SERVER ERROR";
  }

  let error = new ApiError(statusCode, message, false, err.stack);
  next(error);
};

module.exports = EmailErrorHandler;

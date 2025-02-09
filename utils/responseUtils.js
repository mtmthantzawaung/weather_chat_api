// Success Response
const successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Error Response
const errorResponse = (res, statusCode, message, errorDetails = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

module.exports = { successResponse, errorResponse };

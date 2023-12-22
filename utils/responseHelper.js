module.exports = {
  // Sending success response
  sendSuccessResponse: async (res, message, status, data) => {
    return res.status(status).json({
      code: 1,
      type: 'success',
      message: message || 'Success result',
      data: data || [],
    });
  },

  // Sending error response
  sendErrorResponse: async (res, err, status, data) => {
    return res.status(status).json({
      code: 0,
      type: 'error',
      message: err.message ? err.message : err || 'Internal Server Error',
      data: data || [],
    });
  },
};

const success = (res, status, data = []) => {
  res.status(status).json({
    status: 'success',
    results: data?.length,
    data,
  });
};

const errorResponse = (error, req, res, next) => {
  error.status = error.status || 500;

  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = { success, errorResponse };

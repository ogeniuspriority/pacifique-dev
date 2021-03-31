const errorResponse = (res, status, resError) => {
  res.status(status).json({
    status,
    error: resError,
  });
};
const successResponse = (res, status, resMessage, results = null) => {
  res.status(status).json({
    status,
    message: resMessage,
    results,
  });
};

const emptyResponse = (res, status) => {
  res.status(status).json({});
};
module.exports = { errorResponse, successResponse, emptyResponse };

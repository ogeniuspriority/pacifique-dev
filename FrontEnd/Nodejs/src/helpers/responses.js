export const errorResponse = (res, status, resError) => {
  res.status(status).json({
    status,
    error: resError,
  });
};
export const successResponse = (res, status, resMessage, results = null) => {
  res.status(status).json({
    status,
    message: resMessage,
    results,
  });
};

export const emptyResponse = (res, status) => {
  res.status(status).json({});
};

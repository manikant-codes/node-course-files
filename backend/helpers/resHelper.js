const sendErrorResponse = (res, msg, status = 500) => {
  res.status(status).json({ success: false, msg });
};

const sendDataResponse = (res, data, status = 200) => {
  res.status(status).json({ success: true, data });
};

const sendSuccessResponse = (res, msg, status = 200) => {
  res.status(status).json({ success: true, msg });
};

module.exports = { sendErrorResponse, sendDataResponse, sendSuccessResponse };

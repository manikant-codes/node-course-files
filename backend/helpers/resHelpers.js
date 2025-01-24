const sendErrorResponse = (res, msg, status = 500) => {
  res.status(status).json({ success: false, msg });
};

const sendSuccessResponse = (res, msg, status = 200) => {
  res.status(status).json({ success: true, msg });
};

const sendDataResponse = (res, data, status = 200) => {
  res.status(status).json({ success: true, data });
};

module.exports = { sendErrorResponse, sendSuccessResponse, sendDataResponse };

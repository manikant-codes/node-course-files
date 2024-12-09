const sendErrorResponse = (res, msg, status = 500) => {
  res.status(status).json({ success: false, msg: msg });
};

const sendDataResponse = (res, data, status = 200) => {
  res.status(status).json({ success: true, data: data });
};

module.exports = { sendErrorResponse, sendDataResponse };

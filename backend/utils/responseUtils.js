const successDataRes = (res, data, status = 200) => {
  res.status(status).json({ success: true, data: data });
};

const successMsgRes = (res, msg, status = 200) => {
  res.status(status).json({ success: true, msg: msg });
};

const errorMsgRes = (res, msg, status = 500) => {
  res.status(status).json({ success: false, msg: msg });
};

module.exports = { successDataRes, successMsgRes, errorMsgRes };

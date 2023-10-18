const testInitial = (req, res) => {
  if (!req.headers["content-type"]) {
    return res.status(400).json({
      message: "Request header undefined",
    });
  }
  if (req.headers["content-type"] !== "multipart/form-data") {
    return res.status(400).json({
      message: "Request header is not allowed",
    });
  }
  return res.status(200).json({
    message: "welcome to test controller",
  });
};

module.exports = {
  testInitial,
};

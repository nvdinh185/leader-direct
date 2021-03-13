// nhúng router để gán hàm 
module.exports = (req, res, next) => {
  req.logAccess = require("./logs-viewer-save");
  next();
};

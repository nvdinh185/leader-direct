const ssoModels = require("../midlewares/sso/models");
// xác định req.origin nhận được từ webserver
// có chứa trong csdl không? 
// -- mỗi lần truy vấn là một lần đọc danh sách cors từ csdl?
module.exports = (reqOriginStr) => {
    return Promise.resolve(true);
}

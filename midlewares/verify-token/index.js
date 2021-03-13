/**
 * Nhúng xác thực vào routers để xác thực các token
 * Phương thức trực tiếp hay gián tiếp được cấu hình
 * IS_PROXY = true thì kết nối gián tiếp
 * false thì kết nối trực tiếp của máy chủ socket 
 */

module.exports = {
    ...require("./verify-token")
}
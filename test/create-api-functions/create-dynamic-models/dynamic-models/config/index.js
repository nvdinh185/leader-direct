module.exports = {

    // kết nối csdl api và phân quyền
    dbModels: require("../../../db/db-connection-pool-right"),
    // kết nối csdl tài nguyên chính thức của dự án
    dbMainResource: require("../../../db/db-connection-pool-main"),
    
    // khai báo kết nối csdl bất kỳ để sử dụng cho mô hình động
    dbConnectionAny: require("../../../db/db-connection-any"),
    
    // tham số chuẩn để kết nối với các csdl
    // tên csdl cho mô hình được khai báo trong csdl như - db-<model-name>
    // dbCcdcTscd: require("../../../db/db-connection-any")("mongodb", "ccdc-tscd-20201125"),
    // yêu cầu với kết nối dữ liệu có sẵn
    // ... có thể khai thêm theo nguyên tắt đặt tên là:
    // <chữ thường> + <Chữ hoa đầu của từ> + ...+  <Chữ hoa đầu của từ>... = db_connection = <từ chữ thường>-<từ chữ thường>-<từ chữ thường>...
    
}
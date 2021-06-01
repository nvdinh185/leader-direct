// Đây là thủ tục tạo tự động từ ./test/create-models by cuong.dq

// Lớp đối tượng này sẽ chạy các câu lệnh sql, function riêng biệt cho csdl
class RunSql {
    constructor(db) {
        // giao tiếp csdl Database theo mô hình (không phụ thuộc loại csdl)
        this.dbModel = db;
        // csdl DAO nguyên thủy sử dụng như các phương thức cũ (phải biết rõ đang sử dụng loại csdl nào để sử dụng lệnh phù hợp)
        this.dbDAO = db.getDbInstance();
        // trường hợp muốn sử dụng phương thức runSql, hoặc runFunc, thì sử dụng this.db
    }

}

module.exports = RunSql;
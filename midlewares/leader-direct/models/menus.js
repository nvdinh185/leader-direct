// Mô hình này được tạo tự động từ quy trình ./test/create-models/create-models-interface.js

// ĐỂ sử dụng thực tế, hãy viết thêm các thủ tục theo nhu cầu giao tiếp khác

// Mô hình giao tiếp csdl mẫu qua một bảng.
// Trường hợp, sử dụng các phương thức runSql, hoặc runFunc trực tiếp qua this.db
// hoặc sử dụng các lệnh nguyên gốc db của các DAO như SqliteDAO, OracleDAO thì sử dụng this.db.getDbInstance()
const TABLE_NAME = "menus";
const { menus } = require("./json-text-models");
const { DynamicModel } = require("node-js-orm");

// Định nghĩa khai báo một mô hình với csdl bằng mở rộng lớp mô hình từ thư viện và gọi lại thư viện
class Menus extends DynamicModel {
    
    constructor(db) {
        // thực hiện khởi tạo mô hình lớp trên
        super(db, TABLE_NAME, menus);
    }
    
    /*
    // Danh sách các hàm mặt định của mô hình thuộc đối tượng Model gồm:
    - this.sync() = tạo bảng trong csdl
    - this.getStructure() = trả về cấu trúc thực của mô hình
    - this.getUniques() = Trả về đối tượng chứa các trường UNIQUE để tự update theo json
    - this.getDbName() = trả về tên của database đang sử dụng cho mô hình (để debug)
    - this.getName() = trả về tên bảng của mô hình
    - this.getDb() = trả về csdl của mô hình đang kết nối (đối tượng database)
    - this.create() = insert - C  chèn một bảng ghi vào csdl theo json
    - this.read()   = select - R  trả về kiểu đối tượng
    - this.readAll() = select * or all from ... trả về kiểu mảng
    - this.readCount() trả về số lượng bảng ghi của bảng theo mệnh đề where
    - this.readPage() = tương đương getPage()  đọc theo kiểu phân trang
    - this.update() = update - U cập nhập 1 bảng ghi đầu tiên tìm thấy
    - this.updateAll() = update - U cập nhập tất cả các bảng ghi thỏa mãn mệnh đề where
    - this.delete() = delete - D xóa 1 bảng ghi đầu tiên tìm thấy
    - this.deleteAll() = delete - D xóa tất cả các bảng ghi thỏa mã mệnh đề where
     */

    /*
    Danh sách các đối tượng thuộc mô hình động DynamicModel dùng chung tất cả gồm:
   - this.getCount() = trả về số lượng bảng ghi
   - this.getPage() = trả về dữ liệu phân trang
   - this.getAllData() = trả về dữ liệu kiểu mảng
   - this.getFirstRecord() = trả về dữ liệu 1 bảng ghi đầu tiên tìm thấy
   - this.insertOneRecord() = chèn một bảng ghi
   - this.importRows() = chèn nhiều bảng ghi không cập nhập nếu lỗi hoặc trùng
   - this.importRowsUpdates() = chèn nhiều bảng ghi có cập nhập theo các khóa whereKeys =[...] làm mệnh đề where
   - this.updateRows() = (*) cập nhập nhiều bảng ghi theo các khóa whereKeys hoặc theo các trường unique mặt định khai báo trong mô hình khi định nghĩa
   - this.updateOneRecord() = update 1 bảng ghi
   - this.updateAll() = update nhiều bảng ghi theo where
   - this.deleteOneRecord() = xóa một bảng ghi
   - this.deleteAll() = xóa nhiều bảng ghi theo where
     */

    /*
       * Hướng dẫn nhập liệu các mệnh đề where (clause):
       *
       * $lt <, nhỏ hơn
       * $lte <=, nhỏ hơn hoặc bằng
       * $gt >, lớn hơn
       * $gte >=, lớn hơn hoặc bằng
       * $ne !=, không bằng
       * $in [], nằm trong tập
       * $nin [], không nằm trong tập
       * $like [], giống với *x* = %x%
       * $null true/false, is null
       * $exists true/false is not null
       */

    // Viết các phương thức riêng cho Mô hình nếu muốn để khai thác dữ liệu thêm
    // ...

    // ... Bạn có thể chèn vào các phương thức, hàm riêng để thao tác với cơ sở dữ liệu, để trả kết quả cho người dùng
    // ... xem thêm thư viện https://www.npmjs.com/package/node-js-orm hoặc vào thư viện gốc được cài đặt trên ./node-module để biết thêm các hàm giao tiếp khác

}

module.exports = Menus;
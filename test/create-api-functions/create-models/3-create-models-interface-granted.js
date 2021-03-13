// 3. Xuất bản các mô hình của phân quyền (sử dụng như mô hình tổng quát)
// Thủ tục này sẽ tạo ra các mô hình dữ liệu từ cấu trúc csdl trong mô hình
// lưu ý khai báo đường dẫn file mô hình được tạo ra ở bước 2 của quy trình
// và khai lại bằng đường dẫn bên dưới cho đúng

const { rootEntry, mainEntry } = require("../config/params");

const jsonModels = require(`../../..${mainEntry}/models/json-text-models.js`);

const fs = require("fs");
const path = require("path");

const dirModels = `${rootEntry}${mainEntry}${path.sep}models`
console.log("*** Đường dẫn chính của mô hình:", dirModels);

// ghi các mô hình để export vào file index
let modelExports = `    jsonModels: require("./json-text-models"),\n`;

// Tạo tất cả các mô hình hiện có được khai báo
for (let tableName in jsonModels) {
    let objModelFile = `${dirModels}${path.sep}${tableName}.js`
    console.log("-->", objModelFile);
    if (tableName && !fs.existsSync(objModelFile)) {
        fs.writeFileSync(objModelFile,
            `// Mô hình này được tạo tự động từ quy trình ./test/create-api-functions/3-create-models-interface-granted.js

// ĐỂ sử dụng thực tế, hãy viết thêm các thủ tục theo nhu cầu giao tiếp khác

// Mô hình giao tiếp csdl mẫu qua một bảng.
// Trường hợp, sử dụng các phương thức runSql, hoặc runFunc trực tiếp qua this.db
// hoặc sử dụng các lệnh nguyên gốc db của các DAO như SqliteDAO, OracleDAO thì sử dụng this.db.getDbInstance()
const TABLE_NAME = "${tableName}";
const { ${tableName} } = require("./json-text-models");
const { DynamicModel } = require("node-js-orm");

// Định nghĩa khai báo một mô hình với csdl bằng mở rộng lớp mô hình từ thư viện và gọi lại thư viện
class ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} extends DynamicModel {
    
    constructor(db) {
        super(db, TABLE_NAME, ${tableName});
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

module.exports = ${tableName.charAt(0).toUpperCase() + tableName.slice(1)};`
        )
    }
    modelExports += `    ${tableName}: new (require("./${tableName}"))(db),\n`
}

// định nghĩa và xuất bản các mô hình trong module này ra bên ngoài sử dụng tại ./index.js
// xuất bản đè luôn các danh sách
let indexFile = `${dirModels}${path.sep}index.js`
console.log("***> Xuất bản:", indexFile);
// if (!fs.existsSync(indexFile)) {
fs.writeFileSync(indexFile
    , `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/3-create-models-interface-granted.js - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
${modelExports}
    // khai báo các mô hình dữ liệu khác nếu cần 
    // ...
}`
);
// }

process.exit(0);
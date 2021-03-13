// tạo các thư mục cần thiết cho mô hình gồm:
/**
 * Đường dẫn gốc, rootEntry của dự án
 * Đường dẫn chính của các hàm model gồm:
 * -
 */
const { rootEntry, mainEntry, db_connection_pool } = require("./config");

// các đường dẫn và file mẫu
const subEntries = ["models", "queries", "config"];

const fs = require("fs");
const path = require("path");

console.log("***>", `${rootEntry}`);

let entries = mainEntry.split("/");
// lần lược tạo các đường dẫn
let entry = `${rootEntry}`;

// duyệt hết tạo đường dẫn chính
for (let i in entries) {
  let el = entries[i];
  if (el && el !== "." && el !== ".." && el !== "") {
    entry += `${path.sep}${el}`;
    console.log("-->", `${entry}`, fs.existsSync(entry));
    if (!fs.existsSync(entry)) {
      fs.mkdirSync(entry);
    }
  }
}

// duyệt các đường dẫn phụ để tạo tiếp đường dẫn phụ
for (let i in subEntries) {
  let el = subEntries[i];
  if (el && el !== "." && el !== ".." && el !== "") {
    // tạo đường dẫn nếu chưa có
    let subEntry = `${entry}${path.sep}${el}`;
    console.log("-->", `${subEntry}`, fs.existsSync(subEntry));
    if (!fs.existsSync(subEntry)) {
      fs.mkdirSync(subEntry);
    }
    // tạo file index tương ứng cho từng module
    let indexFile = `${subEntry}${path.sep}index.js`;
    console.log("-->", `${indexFile}`, fs.existsSync(indexFile));
    if (!fs.existsSync(indexFile)) {
      fs.writeFileSync(
        indexFile,
        `// Đây là thủ tục tạo tự động từ ./test/create-models by cuong.dq

` +
          (el === "config"
            ? `module.exports = require("${db_connection_pool}");`
            : `// khai báo giao tiếp csdl
const db = require("../config");

module.exports = {
    ${
      el === "models"
        ? `jsonModels: require("./json-text-models"),\n    //organizations: new (require("./organizations"))(db),`
        : el === "queries"
        ? `joinQueries: new (require("./join-queries"))(db),\n    runSqls: new (require("./run-sqls"))(db),`
        : ``
    }
    // khai báo các model để xuất ra ngoài sử dụng
    //...
}`)
      );
    }

    // tạo các file mẫu cố định để tham chiếu khai báo
    if (el === "queries") {
      let queryFiles = [`join-queries.js`, `run-sqls.js`];
      for (let i in queryFiles) {
        let elFile = queryFiles[i];
        let indexFile = `${subEntry}${path.sep}${elFile}`;
        console.log("-->", `${indexFile}`, fs.existsSync(indexFile));
        if (!fs.existsSync(indexFile)) {
          fs.writeFileSync(
            indexFile,
            `// Đây là thủ tục tạo tự động từ ./test/create-models by cuong.dq

// Lớp đối tượng này sẽ chạy các câu lệnh sql, function riêng biệt cho csdl
class ${elFile === "join-queries.js" ? `JoinQueries` : `RunSql`} {
    constructor(db) {
        // giao tiếp csdl Database theo mô hình (không phụ thuộc loại csdl)
        this.dbModel = db;
        // csdl DAO nguyên thủy sử dụng như các phương thức cũ (phải biết rõ đang sử dụng loại csdl nào để sử dụng lệnh phù hợp)
        this.dbDAO = db.getDbInstance();
        // trường hợp muốn sử dụng phương thức runSql, hoặc runFunc, thì sử dụng this.db
    }

}

module.exports = ${elFile === "join-queries.js" ? `JoinQueries` : `RunSql`};`
          );
        }
      }
    }
  }

  // tạo file index chính
  let indexFileMain = `${entry}${path.sep}index.js`;
  console.log("-->", `${indexFileMain}=${fs.existsSync(indexFileMain)}`);
  if (!fs.existsSync(indexFileMain)) {
    fs.writeFileSync(
      indexFileMain,
      `// Đây là thủ tục tạo tự động từ ./test/create-models by cuong.dq

// xuất bản mô hình ra ngoài để sử dụng
            
module.exports = {
    models: require("./models"),
    queries: require("./queries"),
}`
    );
  }
}

// In dòng đường dẫn để tạo file model lưu lại copy vào tạo model
let fileModel = `.${mainEntry}/models/json-text-models.js`;
console.log("*** Save model to -->", fileModel);

process.exit(0);

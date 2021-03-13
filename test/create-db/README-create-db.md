# Quy trình tạo csdl. Với dự án demo, sử dụng sqlite để tạo. Với dự án thực, chuyển kết nối oracle thì toàn bộ việc tạo sẽ không thay đổi.

2020-11-10 by cuongdq

# Yêu cầu Cài đặt thư viện mới nhất:

```sh

npm i node-js-orm@latest cng-node-js-utils@latest client-socket-nodejs@latest

# cài đặt các thành phần csdl, thư viện dùng cho dự án
npm install cng-node-js-utils@latest node-js-orm@latest
# các thư viện kết nối csdl tùy vào loại csdl ta dùng thì cài thư viện tương ứng
npm install oracle
# hoặc
npm install sqlite3
# hoặc mongodb
npm install mongodb

```

Điều kiện phải khai báo cấu trúc csdl trong 1 file excel hoàn chỉnh theo mô hình orm nằm tại: `./db/excel/ql-tram.cuongdq.sqlite.v21.orm.xlsx`. Và khai báo cấu hình trong file ./db/index.js để xuất bảng đường dẫn excelFile này để sử dụng chung cho toàn dự án.

# Bước 1: khai báo cấu hình file excel đầu vào tại `./db/index.js` ví dụ:
```js

module.exports = {
    excelFile: `./db/excel/sample.excel-2-node-orm.xlsx`,  // file excel chứa mô hình csdl được thiết kế theo mẫu
    rootEntry: __dirname.substring(0, __dirname.length - 3),
    mainEntry: `/midlewares/your-models-sample`,         // tên đường dẫn khai báo mô hình giao tiếp
} 

```

# Bước 2: Khai báo kết nối csdl đích của dữ liệu tại `./db/db-connection-des.js` đến với csdl mong muốn. Rồi thực hiện các thủ tục sau

```sh

# khai báo cấu hình kết nối csdl phù hợp tại file `./db/db-connection-pool-des.js`
# Liệt kê danh sách bảng có trong csdl
node ./test/create-db/1.create-list-tables-from-excel.js
# copy danh sách các bảng vào mảng để chèn dữ liệu

# 1. tạo tables (kiểm tra lại file excel và chuỗi kết nối csdl đúng)
node ./test/create-db/2.create-tables-logs-mongodb-only.js
# node ./test/create-db/2.create-tables-from-excel.js
# Đảm bảo việc tạo db này không xãy ra lỗi, thì thiết kế csdl đã được

# chèn dữ liệu khai trước vào csdl (như danh mục, ..., phân quyền,...)
node ./test/create-db/3.import-tables-from-excel.js

# Update dữ liệu nếu có trước đó
node ./test/create-db/4.update-tables-from-excel.js

# Trường hợp kết quả từng bảng bị fail, thì thực hiện chèn kiểm tra từng bảng bằng tham số debug để xem
node ./test/create-db/5.import-table-fail-from-excel.js

# Kiểm tra xem select dữ liệu đã tạo
node ./test/create-db/test-select-tables-from-db.js


```
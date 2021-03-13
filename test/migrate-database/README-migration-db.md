# Thủ tục này hỗ trợ tạo csdl từ file excel và cho phép import danh mục từ file excel có sẵn

# Yêu cầu Cài đặt thư viện mới nhất:

```sh

npm i node-js-orm@latest cng-node-js-utils@latest client-socket-nodejs@latest

```

# Ngoài ra, còn hỗ trợ cho việc di trú dữ liệu từ loại csdl này sang csdl khác hoặc giữa các loại csdl với nhau.


## Quy trình Tạo csdl từ file excel mô hình. 
# 1. Soạn file mô hình theo mẫu, lưu tại đường dẫn ./db/excel/... Ví dụ: `database-ql-tram.cuongdq.sqlite.v21.orm.xlsx`. Đây là một khâu quan trọng nhất của hệ thống, nhằm đảm bảo csdl lưu được tất cả các nghiệp vụ liên quan, cũng từ đây giúp cho tất cả mọi người tham gia dự án có thể hiểu được cấu trúc csdl như thế nào.

Điều kiện phải khai báo cấu trúc csdl trong 1 file excel hoàn chỉnh theo mô hình orm nằm tại: `./db/excel/database-ql-tram.cuongdq.sqlite.v21.orm.xlsx`. Và khai báo cấu hình trong file ./db/index.js để xuất bảng đường dẫn excelFile này để sử dụng chung cho toàn dự án.


# 2. Thực hiện khai báo cấu hình csdl (loại csdl cần dùng như: mongodb, sqlite3 hay oracle ...) trong mẫu cấu hình tại `./db/db-connection-des.js`. Gọi là csdl đích đến. (trong mẫu là ví dụ dùng sqlite3).

# 3. Thực hiện tạo csdl thông qua thủ tục viết sẵn như bên dưới. Lưu ý phải cấu hình phù hợp các file excel đầu vào và kết nối csdl cần tạo ở bước 1 và bước 2 đảm bảo theo yêu cầu.

# --- khai báo cấu hình file excel đầu vào tại `./db/index.js`
```js
module.exports = {
    excelFile: `./db/excel/database-ql-tram.cuongdq.sqlite.v21.orm.xlsx`,
    rootEntry: __dirname.substring(0, __dirname.length - 3),
    mainEntry: `/midlewares/quan-ly-nha-tram`,
}
```

--------------------------------------------------------------------

# QUY Trình cơ bản nhất là: đọc cơ sở dữ liệu gốc có bao nhiêu bảng:
      - liệt kê tất cả các bảng, (xây dựng DAO để đọc tên bảng)
      - đọc cấu trúc dữ liệu của từng bảng (xây dựng DAO để đọc cấu trúc đó)
      - chuyển đổi kiểu dữ liệu của từng bảng đó sang mô hình, - xuất ra file excel mô hình đó
      - trực tiếp review dữ liệu, các ràng buộc, các index, các khóa chính, các unique, và khai báo lại mô hình cho phù hợp
      - sau đó dùng file excel để tạo mô hình dữ liệu cho csdl mới -> sau khi tạo xong -> thì mới sử dụng thủ tục này

## Sửa soạn trước:
    - Thay đổi kết nối csdl ở file ./db/db-connection-des.js cho csdl đích đến cần chuyển đến
    - Thay đổi kết nối csdl ở file ./db/db-connection-src.js cho csdl nguồn

## CÁC LỆNH THỰC THI:

```sh

# Tạo csdl từ mô hình - cho bất kỳ loại csdl nào
node ./test/migrate-database/1.create-db-from-excel.js

# import một số dữ liệu mẫu vào trước
node ./test/migrate-database/2.import-tables-from-excel.js

# Tạo cấu trúc mô hình của các bảng để lưu lại trong file: json-models-.js Với windown thì đổi tên file và copy ruột nhé
node ./test/migrate-database/3.create-text-model-from-excel.js > ./test/migrate-database/json-models-.js

# Copy mô hình bước 2 in ra ở log, vào json-models.js để khai báo mô hình giao tiếp csdl (tham khảo quy trình tạo mô hình tại) 

# Chạy thủ tục di trú dữ liệu
node ./test/migrate-database/4.migration-db-2-db-by-models.js

```
# Hướng dẫn này chỉ cho dev tạo các mô hình giao tiếp csdl tài nguyên (RESOURCE) cố định.

## Mô hình giao tiếp csdl là phương tiện để dev tiết kiệm thời gian thiết kế các hàm query trực tiếp từ csdl. Với mô hình tạo ra này, dễ dàng nhúng vào các xử lý để select, update, insert/import, delete csdl thông qua đối tượng json một cách nhanh chóng.

## Lưu ý: Mô hình được tạo tĩnh theo quy trình này là đầu mối ORM tương đương với csdl tài nguyên. Mỗi tài nguyên, khai báo một mô hình giao tiếp tương đương.
## Có thể sử dụng mô hình động thì không cần phải tạo mô hình này

2020-11-10 - by cuong.dq sửa kiểu mô hình mở rộng của DynamicModel cho gọn code và bổ sung các hàm import

# Đảm bảo cài lại thư viện mới nhất để sử dụng

```sh
npm i node-js-orm@latest cng-node-js-utils@latest client-socket-nodejs@latest
```

# Các bộ xử lý req,res,next sẽ sử dụng bộ giao tiếp này để truy vấn csdl mà không phụ thuộc vào loại csdl đang dùng cho dự án là gì.

# I. Điều kiện bắc buộc trước khi thực hiện tạo mô hình:

# 1. Quy trình thiết kế csdl (hoặc copy cấu trúc csdl qua mô hình ở file excel -orm mẫu ) phải được khai báo đầy đủ tại `./db/excel/....` ví dụ: ta có file './db/excel/database-ql-tram.cuongdq.sqlite.v21.orm.xlsx` dự trên mẫu chung là file 'sample.excel-2-node-orm.xlsx`. Cấu trúc csdl này là bảng sao của mô hình cần giao tiếp csdl (bằng phương pháp sao chép, cấu trúc bảng, tên trường dữ liệu có sẵn - hoặc tự thiết kế csdl mới)

# 2. Quy trình tạo csdl đã hoàn thành, việc kết nối csdl đã tạo ở chuỗi kêt nối chính thức tại: `./db/db-connection-pool-main.js`.

# 3. Nếu chưa tạo csdl, hãy vào quy trình `./test/create-db` để thực hiện.

# 4. Trường hợp muốn nâng cấp csdl, hoặc tạo thêm bảng, import thêm dữ liệu, hãy tham khảo quy trình `./test/migration-database`.

- Vậy đến đây ta có 1 file excel cấu trúc csdl hoàn chỉnh theo mô hình orm nằm tại: `./db/excel/database-ql-tram.cuongdq.sqlite.v21.orm.xlsx`.
- Và khai báo cấu hình trong file ./db/index.js để xuất bảng đường dẫn excelFile này để sử dụng chung cho toàn dự án.

```js
module.exports = {
  excelFile: `./db/excel/sample.excel-2-node-orm.xlsx`, // file excel chứa mô hình csdl được thiết kế theo mẫu
  rootEntry: __dirname.substring(0, __dirname.length - 3),
  mainEntry: `/midlewares/your-models-sample`, // tên đường dẫn khai báo mô hình giao tiếp
};
```

- và đã có một kết nối csdl hoàn chỉnh vào csdl chính thức của dự án tại `./db/db-connection-main.js`

# II. Cách thức thực hiện tạo mô hình để giao tiếp csdl của dự án.

- Dữ liệu đầu vào: file excel để tạo mô hình, file kết nối csdl để giao tiếp csdl qua mô hình, ngõ vào của mô hình có đường dẫn.

```sh

# Bước 1: tạo các thư mục cần thiết cho midlewares của mô hình giao tiếp csdl
node ./test/create-models/1.create-main-entries.js
# copy đường dẫn cuối cùng in ra để dán vào phía dưới

# Bước 2: Tạo cấu trúc của mô hình từ file excel để khai báo cấu trúc giao tiếp csdl
# LƯU Ý: copy đường dẫn in ra ở bước 1 vào đường dẫn tạo file. Nếu chạy ở môi trường win, thì việc tạo file js nó chứa format font không tương thích. Do đó phải đổi tên và tạo file mới json-text-models.js bằng thủ công trước khi thực hiện. Và sửa file tạo phía sau thêm ký tự khác.
node ./test/create-models/2.create-model-from-excel.js > ./midlewares/leader-direct/models/json-text-models-.js

# Đặt tên file mới: json-text-models.js, rồi copy chỉ phần module.exports = {} sang để lưu file mô hình này, xóa file json-text-models-sample.js này đi

# Bước 3: Copy đường dẫn mô hình ở bước 2 để khai báo vào file `./test/create-models/create-models-interface.js` để lấy toàn bộ mô hình của dự án. Sau đó chạy lệnh sau:
node ./test/create-models/3.create-models-interface.js

# Bước 4: Kiểm tra mô hình đã chạy được, bằng cách select một bảng dữ liệu nào đó có trong csdl
node ./test/create-models/4.test-select-data-in-model.js

```

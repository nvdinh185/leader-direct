# Thủ tục Tự động tạo giao tiếp mô hình động từ mẫu chuẩn.

## LƯU Ý: để mô hình hoạt động được, yêu cầu mô hình granted-users phải được tạo trước đó.

## Thủ tục này sẽ tự tạo ra thư mục ./midlewares/dynamic-models/.. chứa thư viện phục vụ cho việc tương tác với mô hình ./midlewares/granted-users để xử lý các dữ liệu phân quyền truy cập mức bảng CRUD cho user, và tương tác với các table về mức bảng phục vụ các API mức bảng.

## Sau khi tạo xong, vào thư mục ./midlewares/dynamic-models/config/index.js để khai báo các biến kết nối csdl phù hợp thực tế để sử dụng test thử mô hình.

```sh

# Tạo giao tiếp mô hình động
node ./test/create-api-functions/create-dynamic-models/1.create-dynamic-models.js

# Kiểm tra sự hoạt động của mô hình động
node ./test/create-api-functions/create-dynamic-models/2.create-dynamic-model-table.js

```
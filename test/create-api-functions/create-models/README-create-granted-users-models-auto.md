# Hướng dẫn tạo mô hình giao tiếp CSDL phân quyền API:

## II/. Tạo mô hình cho phân quyền tự động ở ./midlewares/granted-users/...:

```sh
# 1. Tạo kết cấu thư mục của mô hình - Lưu ý trong giao tiếp có 2 file chưa có mô hình nhưng sẽ tạo ra trước đó là file ./midlewares/../index.js - chứa 2 file là userRight: và grantedHandler: -- với 2 file này, thủ tục tạo ở bước # 3. mới có hiệu lực
node ./test/create-api-functions/create-models/1-create-main-entries.js
# copy đường dẫn cuối cùng in ra để dán vào phía dưới

# 2. LƯU Ý: copy đường dẫn in ra ở bước 1 vào đường dẫn tạo file
node ./test/create-api-functions/create-models/2-create-model-from-excel.js > ./midlewares/granted-users/models/json-text-models-.js
# Đặt tên file mới: json-text-models.js, rồi copy chỉ phần module.exports = {} sang để lưu file mô hình này, xóa file json-text-models-.js này đi

# 3. Tạo các hàm giao tiếp csdl của mô hình phân quyền (bổ sung tạo ./granted-handler.js)
node ./test/create-api-functions/create-models/3-create-models-interface-granted.js

# 4. Kiểm tra seletc dữ liệu của mô hình phân quyền thông qua mô hình được chưa?
node ./test/create-api-functions/create-models/4-test-select-data-in-model.js

# 5.  Kiểm tra phân quyền theo kịch bản user đã thiết kế, quyền của mỗi user được cấp trong file excel phù hợp không
node ./test/create-api-functions/create-models/5-test-check-user-rights.js

```
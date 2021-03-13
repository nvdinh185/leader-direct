# Tài liệu này hướng dẫn tạo một mô hình động giao tiếp với bất kỳ mô hình nào. Sau đó thông qua các hàm api được phân quyền cho user để sử dụng tác động đến các bảng của mô hình thực

## Bước 1: Thực hiện khai báo một mô hình với kết nối csdl được xác định thông qua API: `${main_link}/models/create-model/${MODEL_NAME}`

## Bước 2: Đọc file excel tại sheet có tên trùng với tên mô hình (là cấu trúc csdl của mô hình động phải thiết kế trước - hoặc đồng bộ với csdl đã tồn tại trước đó). Rồi import bằng hàm API: `${main_link}/models/import-model/${MODEL_NAME}`

```sh

node ./test/create-api-functions/create-main-models-webservice/1.i-import-model-structure-from-excel.js

```

## Bước 3: Thực hiện đồng bộ (kiểm tra và tạo bảng nếu không tồn tại đến csdl của mô hình đó) bằng API: `${main_link}/models/sync-model/${MODEL_NAME}`
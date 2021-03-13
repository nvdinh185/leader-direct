# Hướng dẫn các lệnh tạo csdl phân quyền API:

## I/. Tạo các bảng đưa vào csdl phân quyền theo chức năng (xóa các bảng function_apis, function_groups, function_granted và api_routers trước khi tạo bảng cấu trúc mới)

```sh

# 1. Liệt kê tất cả các bảng hiện có trong file excel xem trước
node ./test/create-api-functions/create-tables/1.create-list-tables-from-excel.js

# 2. Tạo các bảng dữ liệu phân quyền từ file excel - cùng csdl destination
node ./test/create-api-functions/create-tables/2.create-tables-from-excel.js

# 3. Import dữ liệu chức năng, phân quyền từ file excel vào csdl destination
node ./test/create-api-functions/create-tables/3-1.import-update-tables-from-excel.js

node ./test/create-api-functions/create-tables/3.import-tables-from-excel.js

# 4. Trường hợp import vào không được bị lỗi thì debug bằng cách import đơn lẻ từng bảng lỗi để khắc phục
node ./test/create-api-functions/create-tables/4.import-table-fail-from-excel.js

# 5. Kiểm tra dữ liệu trong các bảng đã import vào csdl thử
node ./test/create-api-functions/create-tables/6.test-select-tables-from-db.js

# 6 Import lại các api mới thiết kế thêm, router và handler đã bổ sung,
# Nếu không import bổ sung thì việc phân quyền sẽ bị bỏ qua không tác dụng
# Nên phải import mới dữ liệu vào
node ./test/create-api-functions/create-tables/5.import-table-new-function-apis-from-excel.js

```
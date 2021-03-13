# Thủ tục này hướng dẫn tạo:

- Cơ sở dữ liệu từ file mô hình csdl thiết kế theo mẫu (tạo bất kỳ loại csdl nào)
- Mô hình giao tiếp csdl trợ giúp cho lập trình viên các công cụ hướng đối tượng với từng bảng trong csdl (giao tiếp bất kỳ csdl nào)

- Cơ sở dữ liệu phân quyền, từ mô hình csdl phân quyền và thiết kế chức năng của API
- Mô hình phân quyền trợ giúp xử lý các chức năng phân quyền (dùng chung tất cả dự án)
- Bộ máy chủ API tự động gồm cả phần server, phần routes, routers, handlers tự động
- Bộ test chức năng theo từng lệnh curl để test thử từng hàm api theo thiết kế

-> người lập trình giờ chỉ còn một nhiệm vụ duy nhất là đọc tài liệu thiết kế chức năng và viết các handler chi tiết để lấy input và trả output

# Yêu cầu: 

- Thiết kế file cấu trúc csdl tài nguyên (RESOURCE) theo mô hình `./db/excel/admin-users.orm.xlsx`. Cấu trúc csdl nằm ở sheet `tables`

- Thiết kế file cấu trúc các hàm APIs theo từng chức năng phân rã theo mẫu `./db/excel/api-functions-granted-user-admin-users-socket-2020-11-24.xlsx`. Trong đó:
+ sheet `admin_users` chứa cấu trúc csdl tài nguyên (như file thiết kế RESOURCE ở trên) 
+ sheet `granted_users` chứa cấu trúc csdl phân quyền api sử dụng hệ thống này
+ sheet `function_apis` chứa thiết kế các hàm api của hệ thống
+ sheet `function_groups` chứa thiết kế phân quyền theo groups truy cập api
+ sheet `function_granted` chứa các user được phân quyền theo các chức năng mặt định (hoặc có thể import vào sau - hoặc phân quyền sau này) - nhưng đảm bảo có một user có quyền root để phân quyền cho các user khác trước tiên khi khởi tạo.


# Quy trình thực hiện:

- 1. vào thư mục `./test/create-db/` đọc file `README-create-db.md` để thực hiện tạo csdl. Hoặc vào thư mục `./test/migrate-database/` đọc file `README-migration-db.md` để thực hiện chuyển đổi csdl từ csdl này sang cơ sở dữ liệu khác.

- 2. vào thư mục `./test/create-models/` đọc file `README-create-models-orm.md` để tạo mô hình giao tiếp cơ sở dữ liệu ở trên.

- 3. Copy phần xác thực token bằng phương pháp socket-server - các user phải được khai báo trên máy chủ socket và dùng phương pháp login socket-client trước vào dự án thực tại thư mục `./midlewares/verify-token/` Copy toàn bộ ruột của nó sang tất cả các dự án

- 4. (bỏ qua) Hỏi Admin máy chủ socket để cấp phép user làm proxy xác thực user - sử dụng quy trình tạo chuỗi kết nối tự động bằng công cụ tại `./test/create-socket-token/` 

- 5. (bỏ qua) Tạo máy chủ test thử token verify thông qua công cụ `./test/create-server/` - Máy chủ này với mục đích chỉ test thử giao tiếp xác thực token thôi nhé.

- 6. vào thư mục `./test/create-api-functions/` đọc file `0.README-create-api-function.md` để tạo dữ liệu và mô hình phân quyền user, các hàm api cho phân quyền và máy chủ thực sự của dự án được thiết kế tại file excel chi tiết các chức năng.

## Thực hiện tất cả 6 bước trên, sẽ có một hệ thống module máy chủ API thực sự. công việc còn lại chỉ là việc lập trình để các handler xử lý các yêu cầu input và output để trả dữ liệu theo yêu cầu của các chức năng API theo thiết kế file excel chức năng.




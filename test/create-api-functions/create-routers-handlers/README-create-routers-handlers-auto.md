# Hướng dẫn tạo tự động máy chủ API :

## IV/. Tạo các routers, handlers và api-route theo các function được thiết kế ở sheet: function-apis. Chỉ cần thiết kế api trên file excel, sau đó chạy chức năng bên dưới thì bộ routers và handler sẽ tự động sinh ra. Nếu file đã tạo ra trước đó thì nó sẽ không ghi đè (trường hợp người dùng đã sửa theo chức năng thực --)

### - Trường hợp, bổ sung thiết kế hàm mới (phải xóa router, file index chính ở handler) chương trình này sẽ tự tạo ra các handler mới.

### Yêu cầu đầu vào: Khai báo cấu hình máy chủ gồm port, tiếp đầu ngữ của máy chủ, baseDirectory,.. tại ./test/create-api-functions/config/params.js

### ĐÂY LÀ BƯỚC QUAN TRỌNG HỖ TRỢ DEV - BACKEND làm việc một cách nhanh chóng để đưa API ra phục vụ cho FRONT-END

### Các dev chỉ xử lý phần cuối ngay ở các handler thôi là được.


```sh

# xxx - hàm này tự động tạo ra các routers và các handlers dựa vào thiết kế của file excel api
# sau đó - dev chỉ cần viết handler là xong api
# trường hợp có bổ sung chức năng mới thì đổi tên router cũ, - handler cũ -> rồi chạy thủ tục này
# sau đó copy các hàm đã viết thêm ở router cũ, và handler cũ sang mới -> rồi viết tiếp cái mới mà thôi

node ./test/create-api-functions/create-routers-handlers/x-create-api-routers-handlers.js

```
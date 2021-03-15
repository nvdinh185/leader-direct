// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/media.xlsx
// Được tạo và lúc 2021-03-15 09:56:11


"use strict";

/*
    Mỗi API tương đương một ROUTER,
    trong mỗi ROUTER sẽ chứa các FUNCTIONs (Chứ năng chính) - là đơn vị nhỏ nhất để hệ thống phục vụ
    
    MỖI FUNCTION là một đường dẫn http(s)://<server:port>/<base>/<api>/<function>
    mỗi <function> sẽ là một tập gồm verifyToken hoặc verifyGranted (phụ thuộc vào việc phân quyền truy cập hay không)
    
    cùng với các hàm bổ sung tiền xử lý trước khi gọi HANDER để gọi các MODELS xử lý dữ liệu từ csdl
    Mỗi HANDER sẽ chứa các Phương thức (hàm) có dạng (req,res,next) để xử lý theo từng nghiệp vụ theo chức năng
    
    trong mỗi phương thức của HANDLER sẽ liên kết với 1 hoặc nhiều MODEL của mô hình giao tiếp csdl để:
    Truy vấn, Insert, Update, Delete, ... xử lý các dữ liệu liên quan
    ... như vậy DEVELOPER bây giờ chỉ còn việc xử lý các HANDERs và điều chỉnh các ROUTERs cho phù hợp với việc tiền xử lý dữ liệu mà thôi
    Mọi việc khác đều tự động sinh ra khi:
    - Có thiết kế cơ sở dữ liệu dạng -orm của cuongdq trên file excel
    - có thiết kế chức năng và phân quyền dạng -orm của cuongdq trên file excel
*/

// Các đường dẫn API tương ứng với các route
const apiRoutes = [
    // Đây là file tự động sinh ra từ file excel ./db/excel/media.xlsx
    // Tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
    // Tạo ra vào lúc 2021-03-15 09:56:11
 

    {
         path: "/test",
         route: require("./routers/router-test"),
     },
 
    // ,... các đường dẫn api khác cho chức năng api khác nữa thêm bằng tay vào đây
];
module.exports = (app, ioSubDir) => {
    // khởi tạo các route
    for (let r of apiRoutes) {
        if (r){
            console.log("*> THE ROUTES of this server:", `${ioSubDir}${r.path}`);
            app.use(`${ioSubDir}${r.path}`, r.route);
        }
    }
};
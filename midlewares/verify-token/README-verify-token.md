# Nhúng gói xác thực token bằng socket:
```sh
# Cài đặt thư viện client-socket-nodejs để liên lạc máy chủ sọcket
npm i client-socket-nodejs@latest
```

# Khai báo định nghĩa các tham số cấu hình liên lạc với máy chủ socket chứa trong file `./cfg/admin-socket-token-cfg` 
```js
/**
 * Đây là cấu hình cho client socket cho máy chủ resource
 * Cấu hình này ghi cặp key, user, pass, type, expired, và token
 * 
 */
module.exports = {
    // tên ứng dụng, hỏi admin của socket server đăng ký nhé
    APP_NAME: "DEMO-RESOURCE-API-CCDC",
    // đường dẫn kết nối socket server (hỏi admin để biết)
    socketLink: {
        // nhớ là ở mạng nội bộ, phải gõ ip trực tiếp
        url: "http://localhost:9225",
        path: "/socket",
        timeout: 10000,
        // đường dẫn xác thực user qua post {token,username,device_id,device_name}
        userInfoPath: "/socket/api/get-user-info"
    },
    // khóa cố định theo thiết bị (hỏi admin để cấp cặp khóa, và chỉ sử dụng trên máy này thôi)
    deviceKey: {
        id:
            "public-key",
        key:
            "private-key",
        created_time: "yyyy-mm-dd hh:mi:ss",
    },
    // loginForm: {
    //     username: "your username", // 'phone or email
    //     user_type: "phone", // 'phone' | 'email' | 'ldap'
    //     password: "your pass",
    //     expired: 1, // num of date for valid of token
    // },
    // cho c3
    token: "your token when logined successfull with user",
    // isDebug: true
}
```

# Khai báo cấu hình và định nghĩa hàm xác thực token trong file `./midlewares/verify-token/vefify-socket-token.js`
```js
/**
 * Hàm này xác thực token và thiết bị có phù hợp với đăng ký ở máy chủ không?
 * tuy vấn thông qua quyền của token proxy server
 */
const { VerifyToken } = require("client-socket-nodejs");

const socketConfig = require("../../cfg/admin-socket-token-cfg");

// khởi tạo kết nối của proxy server (Hỏi admin để cấp các tham số (cặp key, user, và token của proxy trước))
let verifyToken = new VerifyToken(socketConfig);

// sau đó dùng thành phần này để xác thực token của client (nhúng vào máy chủ resource server)
// thông tin trong token sẽ chứa {username, device_id, iat, exp}

module.exports = verifyToken.verify; //(clientToken, clientDevicename)

```

# Khai báo file index.js để xuất bảng các giao tiếp sử dụng ở bên ngoài
```js
/**
 * Cách gọi là khai báo hàm verifyToken ngay sau getToken
 */
module.exports = {
    // hàm trả trực tiếp kết quả cho express
    verifyToken: (req, res, next) => {
        require("./verify-socket-token")(req.token, req.clientDevice)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                req.error = err;
                next()
            });
    }
}
```

# Khai báo và nhúng xác thực token vào các router để xác thực token theo chuỗi sự kiện.
```js
// nhúng bộ xác thực token proxy, nhằm yêu cầu chức năng có token mới thực hiện
const { verifyToken } = require("../../midlewares/verify-token");
// chuỗi kiểm tra token hợp lệ như sau
const verifyTokenChain = [
    // Hàm tự động lấy token trên các lệnh POST, GET, OPTIONS và trả về req.token 
    // (tiếp đầu ngữ thường dùng mặt định là Bear trên header)
    postHandler.getToken
    // thực hiện kiểm tra tính hợp lệ của token và trả về req.user nếu thành công hoặc req.error nếu thất bại
    , verifyToken
    // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
    // sử dụng hàm khai sẵn luôn đỡ mất công
    , expHandlers.checkErrorBeforeResource
];

```

# Khai báo router mẫu như sau:
```js
// ĐÂY LÀ ĐƯỜNG DẪN API như nào 
// (xem đường dẫn khai ở tham số path trong file ./routes/index.js gọi đến router này)
//và khai đúng như vậy
const API = "/api";


// bộ xử lý dữ liệu postHandler = post + getToken để trả về req.token, req.json_data, json.form_data
const { postHandler, Router, expHandlers } = require("cng-node-js-utils");

// ----- PHÂN QUYỀN --- //
// nhúng bộ xác thực token proxy, nhằm yêu cầu chức năng có token mới thực hiện
const { verifyToken } = require("../../midlewares/verify-token");
// chuỗi kiểm tra token hợp lệ như sau
const verifyTokenChain = [
    // Hàm tự động lấy token trên các lệnh POST, GET, OPTIONS và trả về req.token 
    // (tiếp đầu ngữ thường dùng mặt định là Bear trên header)
    postHandler.getToken
    // thực hiện kiểm tra tính hợp lệ của token và trả về req.user nếu thành công hoặc req.error nếu thất bại
    , verifyToken
    // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
    // sử dụng hàm khai sẵn luôn đỡ mất công
    , expHandlers.checkErrorBeforeResource
];


// ----- END PHÂN QUYỀN --- //
// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {
    POST: {
        "/test": [

            ,(req, res, next) => {
                req.finalJson = {test:"Đây là kết quả test thử"};
                next();
            }
            // bổ sung các hàm (req,res,next)=>{ ... next();} để trả về req.finalJson nếu thành công, và req.error nếu thất bại
            // mô hình sẽ tự động trả về 2 trạng thái api 200 (thành công) hoặc 435 (nếu lỗi) tương ứng với 2 kết quả trên
        ],
    },
    GET: {
        // không yêu cầu cấp quyền
        "/test": [
            (req, res, next) => {
                req.finalJson = {test:"Đây là kết quả test thử"};
                next();
            }
            // bổ sung các hàm (req,res,next)=>{ ... next();} để trả về req.finalJson nếu thành công, và req.error nếu thất bại
            // mô hình sẽ tự động trả về 2 trạng thái api 200 (thành công) hoặc 435 (nếu lỗi) tương ứng với 2 kết quả trên
        ],
        // yêu cầu có token hợp lệ mới được lấy dữ liệu
        "/test-with-token": [
            // bổ sung chuỗi kiểm tra token hợp lệ trước khi cung cấp tài nguyên
            ...verifyTokenChain
            , (req, res, next) => {
                req.finalJson = req.user;
                next();
            }
            // bổ sung các hàm (req,res,next)=>{ ... next();} để trả về req.finalJson nếu thành công, và req.error nếu thất bại
            // mô hình sẽ tự động trả về 2 trạng thái api 200 (thành công) hoặc 435 (nếu lỗi) tương ứng với 2 kết quả trên
        ],
    },
};
module.exports = (new Router(funcPaths)).getExpressRouter();
```


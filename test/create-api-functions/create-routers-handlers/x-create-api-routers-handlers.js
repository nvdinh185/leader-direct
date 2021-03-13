// Thủ tục này sẽ tự động tạo các file chính trong thư mục routes và các file functions trong routers
// file ./routes/api-route-...tên route chứa các api cho máy chủ...
// sử dụng file api-route-${routeName} để nhúng trực tiếp và server để start server cung cấp các hàm API theo thiết kế
// trong mỗi router trong thư mục ./routes/routes sẽ chứa các chức năng chính của từng API
// tùy vào điều kiện yêu cầu xác thực, mà chức năng verifyToken và verifyGranted sẽ tự động thêm vào trước khi trả kết quả
// Trên mỗi chức năng tự tạo trong các router( hay còn gọi là API path), sẽ tự nhúng các handler tự sinh theo tên trùng với tên của chức năng
// nhiệm vụ của người lập trình, bây giờ chỉ chú tâm vào viết các handler cho phù hợp trả kết quả đúng theo yêu cầu
// Tùy vào các handler theo nghiệp vụ mà nó sẽ sử dụng mô hình csdl của riêng nó mà xử lý trả kết quả cho các functions của api

// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là function_apis
const {
  excelFile,
  rootEntry,
  routesMain,
  routersEntry,
  handlersMain,
  handlersEntry,
  routeName,
  mainEntry,
  port,
  baseDirectory,
} = require("../config/params");

const {
  createSubFolder,
  convertPath2ObjectName,
  createEntryIndex,
  arrObj,
} = require("cng-node-js-utils");

const headerExcelAuto = `// Đây là file tự động sinh ra từ file excel ${excelFile}
    // Tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
    // Tạo ra vào lúc ${arrObj.getTimestamp()}
`;
const headerAuto = `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ${excelFile}
// Được tạo và lúc ${arrObj.getTimestamp()}
`;

const CFG_API = {
  // tên sheet chứa danh sách các hàm chức năng của máy chủ api
  sheetName: "function_apis",
  // tên trường trong bảng chứa các api-router, để lọc danh sách tạo các apis (routers)
  apiFieldName: "api_router",
  // tiếp đầu ngữ route của các apis (routers) - file có tên ./routes/${prefixRoute}-
  prefixRoute: "apis-route",
};

const fs = require("fs");
const path = require("path");

// import components of orm model
const { excell2Database } = require("node-js-orm");

console.log("***>", `${rootEntry}`);

// lần lược tạo các đường dẫn ./routes nếu chưa tồn tại
createSubFolder(rootEntry, `${routesMain}${routersEntry}`);

// lần lược tạo các đường dẫn ./handlers nếu chưa tồn tại
createSubFolder(rootEntry, `${handlersMain}${handlersEntry}`);

let handlerExport = ""; // adminUssersHandler: require("./admin-users-handler"),

// Khai báo các hàm dùng chung -- có thể khai ở thư viện
// ----------------------------------------------------

/**
 * hàm lọc mảng chức năng theo api để tạo các hàm trong routers;
 * @param {*} apiPath
 * @param {*} arrInput
 * @param {*} method
 */
function createApiFunctions(apiPath, handlerName, arrInput, method) {
  let strFunctions = "";
  // lọc lấy các hàm từ excel theo từng chức năng, của lệnh strFunctions ghi vào đây
  let getFunctions = arrInput.filter(
    (x) => x[CFG_API.apiFieldName] === apiPath && x["method"] === method
  );
  for (let func of getFunctions) {
    if (func && func.api_function) {
      // sửa soạn tên đối tượng handler xử lý tương ứng với api_router này
      // chuyển đổi x-y-z-a-b-c thành xYxZxAxBxCx cách đặt tên cho đối tượng (không phải class)
      strFunctions += `
        /**
         * (${func.id}) ${func.method} ${func.base_directory}${
        func.api_router
      }${func.api_function}
         * 
         * ${func.name}
         * ${func.description}
         * 
         * ${
           func.has_token
             ? "- Yêu cầu CÓ TOKEN"
             : func.has_granted
             ? "- Yêu cầu ĐƯỢC PHÂN QUYỀN"
             : ""
         }
         * 
         * SAMPLE INPUTS: ${func.form_data} ${func.sample_data}
         */
        '${func.api_function}': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            ${
              func.has_token || func.has_granted
                ? `// ${
                    func.has_granted
                      ? "Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode"
                      : ""
                  }
            ${
              func.has_granted
                ? `expHandlers.setRequestParameter('${func.api_function}', 'functionCode'),`
                : ""
            }
            // ${
              func.has_token
                ? "Chuỗi hàm yêu cầu CÓ TOKEN"
                : func.has_granted
                ? "Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode"
                : "..."
            }
            ${
              func.has_token
                ? "...verifyTokenChain,"
                : func.has_granted
                ? "...verifyGrantedChain,"
                : ""
            }`
                : ``
            }${
        func.method === "POST"
          ? `// ${
              func.method === "POST"
                ? func.form_data
                  ? "Hàm xử lý post FormData() trả về req.form_data để truyền file binary"
                  : "Hàm xử lý POST json data trả về req.json_data"
                : "..."
            }
            ${
              func.method === "POST"
                ? func.form_data
                  ? "postHandler.formProcess,"
                  : "postHandler.jsonProcess,"
                : ""
            }`
          : ``
      }
            ${handlerName}.${convertPath2ObjectName(func.api_function)}
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],\n`;
    }
  }
  return strFunctions;
}

// tạo máy chủ mới
function createServer(serverName, apiRoutes, port, baseDirectory) {
  // tạo file index tương ứng cho từng module
  let serverFile = `${rootEntry}${path.sep}server-${serverName}.js`;

  // 1. Tạo máy chủ tại đường dẫn gốc
  console.log(
    "****>SERVER created at:",
    `${serverFile}`,
    fs.existsSync(serverFile)
  );
  if (!fs.existsSync(serverFile)) {
    fs.writeFileSync(
      serverFile,
      `// Đây là cấu hình máy chủ API tự đông được tạo từ ./test/create-api-functions/create-routers-handlers/x-create-api-routers-handlers.js

"use strict"

/**
 * Thủ tục test này dùng để khai báo máy chủ web API một cách nhanh chóng
 */

// công việc khai báo máy chủ chỉ còn có các bước sau:
const expressCfg = {
    // cổng dịch vụ
    port: ${port}
    // trang lỗi trả về không mặt định
    
    // ,default404Page: \`<h1>Máy chủ api</h1>
    // <p>Xin lỗi trang bạn yêu cầu không tìm thấy. Vui lòng liên hệ quản trị hệ thống</p>\`

    // đường dẫn phụ của máy chủ
    , baseDirectory: "${baseDirectory}"
    // đường dẫn trỏ khi truy cập không có router/function được khai báo
    , redirectUrl: "/"

    // đường dẫn trỏ web tĩnh root
    , staticRoot: __dirname + '/client-test-apis'

    // đường dẫn trỏ web tĩnh theo duong dan baseDirectory tren
    , staticHtml: __dirname + '/client-www-sample'

    // in ra các dòng debug để dev phát hiện lỗi
    , isDebug: true
    
    // các domain cho phép truy cập API này mà không báo lỗi cors
    , domainIncludeCors:
        [
                'localhost',
        ]
};

// khai báo phòng chống tấn công ddos
const ddosUse=null //= require('./ddos/ddos-config').express('ip', 'path');

// khai báo các router cho các chức năng nghiệp vụ riêng
// Lưu ý mẫu khai router theo cách mới cũng sẽ đơn giản và gọn nhẹ hơn
const apiRoutes= require("${apiRoutes}");

// nhúng lớp thành phần khai báo máy chủ đơn giản
const { ExpressServer } = require("cng-node-js-utils");

// khai báo cấu hình chống tấn công dò quét url_path
// nếu một client cố tình quét các api không có trong hệ thống quá số lần thì block trả về lỗi 403
// default block là 2 phiên, ta dùng client web thì phải tăng số này lên tùy chọn
const failCfg = {
  checkInterval: 5000, // trong thời gian kiểm tra này mà
  maxCountFail4Block: 20, // số lần gõ địa chỉ bị sai quá 20 lần sẽ bị block
};

// máy chủ socketIo
const socketIoCfg = null; // require("./server-socketio");

// theo dõi log các sự kiện của truy cập máy chủ
const logViewer = null; // require("./logs-viewer");

// tạo lớp máy chủ
const expressServer = new ExpressServer(expressCfg, ddosUse, apiRoutes, socketIoCfg, failCfg, logViewer);

// và cho chạy máy chủ
expressServer.start();`
    );
  }

  console.log(`--->\n\nnode ./server-${serverName}.js\n\n<---`);
}

// tạo handler cho xác thực quyền
function createUserRightHandler(fileName = "user-rights") {
  let handlerFileName = `${rootEntry}${handlersMain}${handlersEntry}${path.sep}${fileName}-handler.js`;
  console.log(
    "-->Created Handler file:",
    `${handlerFileName}=${fs.existsSync(handlerFileName)}`
  );
  if (!fs.existsSync(handlerFileName)) {
    let handlerSample = `${rootEntry}${path.sep}test${path.sep}create-api-functions${path.sep}create-routers-handlers${path.sep}sample-handlers${path.sep}${fileName}-handler.js`;
    if (!fs.existsSync(handlerSample)) {
      console.log(`***> SAMPLE FILE NOT FOUND ${handlerSample}`);
      return;
    }
    // thực hiện copy các handler chuẩn sang handler
    fs.copyFile(handlerSample, handlerFileName, (err) => {
      if (err) throw err;
      console.log(`--->Đã COPY FILE CHUẨN: ${handlerSample}`);
    });
  }
  // trả về tên file đã tạo
  return handlerFileName;
}

/**
 * Hàm tự động tạo các handler để các dev soạn giao tiếp với model xử lý dữ liệu
 * @param {*} fileName trùng với tên của API
 * @param {*} className trùng với tên của API
 * @param {*} arrFunctions danh sách các hàm xử lý
 */
function createHandlerFile(fileName, className, arrFunctions) {
  // nếu tạo file user-rights thì tự tạo ruột luôn có mẫu rồi
  if (fileName === "user-rights" || fileName === "user-tables" || fileName === "models") {
    return createUserRightHandler(fileName);
  }

  // tạo các file handler theo thiết kế để giao các dev viết code chính - giao tiếp với các model csdl

  let handlerFileName = `${rootEntry}${handlersMain}${handlersEntry}${path.sep}${fileName}-handler.js`;
  console.log(
    "-->Created Handler file:",
    `${handlerFileName}=${fs.existsSync(handlerFileName)}`
  );

  // sửa soạn các hàm xử lý Handler:
  let hFunctions = "";
  for (let func of arrFunctions) {
    let getParamAndValidate =
      func.method === "GET"
        ? `
        // thực hiện lấy các dữ liệu đầu theo phương thức GET, 
        // Có thể sử dụng theo mô hình phân trang để lấy giới hạn trang 
        // khi truy vấn một bảng với số lượng bảng ghi nhiều gây chậm trả kết quả, và xử lý tràn bộ nhớ server và client

        // let { page, limit, your_param , ...} = req.paramS;
        // page = page || 1;
        // limit = limit || 100;

        // ràng buộc kiểm tra dữ liệu yêu cầu
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }
`
        : `
        
        // if (!${func.form_data ? `req.form_data` : `req.json_data`}) {
        //   req.error = "Dữ liệu post ${
          func.form_data ? `req.form_data` : `req.json_data`
        } không hợp lệ";
        //   next();
        //   return;
        // }

        // thực hiện lấy các dữ liệu đầu vào tùy vào theo phương thức POST theo json_data hoặc form_data
        // hoặc có thể lấy theo phương thức tham số trên link sau dấu ? bằng req.paramS
    
        // let { your_param } = ${
          func.form_data ? `req.form_data` : `req.json_data`
        };
    
        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }
`;

    hFunctions += `
    /**
     * (${func.id}) ${func.method} ${func.base_directory}${func.api_router}${
      func.api_function
    }
     * 
     * ${func.name}
     * ${func.description}
     * 
     * ${
       func.has_token
         ? "- Yêu cầu CÓ TOKEN"
         : func.has_granted
         ? "- Yêu cầu ĐƯỢC PHÂN QUYỀN"
         : ""
     }
     * 
     * SAMPLE INPUTS: ${func.form_data} ${func.sample_data}
     */
    ${convertPath2ObjectName(func.api_function)}(req, res, next) {
${getParamAndValidate}

        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: ${convertPath2ObjectName(
          func.api_function
        )} từ lớp: .${handlersMain}${handlersEntry}/${fileName}-handler.js" }
        next();

    }

`;
  }

  if (!fs.existsSync(handlerFileName)) {
    fs.writeFileSync(
      handlerFileName,
      `${headerAuto}

"use strict";

// nối csdl thông qua mô hình
// const dbOrm = require("../../db/db-connection-pool-main");
// trả lại DAO của database nguyên gốc như cũ để sử dụng các lệnh
// const db = dbOrm.getDbInstance();

// hoặc sử dụng trực tiếp mô hình để giao tiếp csdl 
// (nó hỗ trợ tự ràng buộc kiểu dữ liệu trước khi insert, update)
// const { your_model, your_model_1 } = require("../../midleware/your-model/models");

class ${className} {

    constructor() { }

${hFunctions}
}

module.exports = new ${className}();`
    );
  }
  // trả về tên file đã tạo
  return handlerFileName;
}
// ----------------------------------------------------

(async () => {
  // 1. Đọc danh sách chức năng từ excel ra mảng
  let arrayFunctionApis = await excell2Database.excel2Array(
    excelFile,
    CFG_API.sheetName
  );
  // console.log(`Các chức năng hệ thống từ file: ${excelFile}\nMảng API/FUNCTIONS = `, arrayFunctionApis);

  // 2. Lọc Lấy danh sách các API độc lập để tạo routers
  let apiRouters = [
    ...new Set(arrayFunctionApis.map((x) => x[CFG_API.apiFieldName])),
  ];
  console.log(
    `Các api_router từ file: ${excelFile}\nMảng API-ROUTERS = `,
    apiRouters
  );

  // 3. chạy vòng lặp để tạo file ./routes/apis-route-

  // danh sách các routers cần phải tạo trong file apis-route
  let routers = `[
    ${headerExcelAuto} 

`;

  for (let api of apiRouters) {
    if (api) {
      routers += `    {
         path: "${api}",
         route: require(".${routersEntry}/router-${api.replace(/\/+/g, "")}"),
     },
 `;
    }
  }
  routers += `
    // ,... các đường dẫn api khác cho chức năng api khác nữa thêm bằng tay vào đây
]`;
  // Sau đây là danh sách các APIs tương ứng mỗi API là một ROUTER đính kèm chứa các chức năng FUNCTIONS
  // tạo file apis-route-xxx.js chính tại ./routes/apis-route-xxx.js
  let apisRouteFileName = `${rootEntry}${routesMain}${path.sep}${CFG_API.prefixRoute}-${routeName}.js`;
  console.log(
    "-->Created file:",
    `${apisRouteFileName}=${fs.existsSync(apisRouteFileName)}`
  );
  if (!fs.existsSync(apisRouteFileName)) {
    fs.writeFileSync(
      apisRouteFileName,
      `${headerAuto}

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
const apiRoutes = ${routers};
module.exports = (app, ioSubDir) => {
    // khởi tạo các route
    for (let r of apiRoutes) {
        if (r){
            console.log("*> THE ROUTES of this server:", \`\${ioSubDir}\${r.path}\`);
            app.use(\`\${ioSubDir}\${r.path}\`, r.route);
        }
    }
};`
    );
  }

  // 4. Chạy vòng lặp để tạo các file routers và handlers chứa các FUNCTIONs của API
  for (let api of apiRouters) {
    if (api) {
      // chuyển tên "/x-y-z/a-b-c" => x-y-z-a-b-c để gán cho tên file handler và tên file router
      let apiSuffixName = api.replace(/\/+/g, "");

      // tên của file router phải giống với router khai báo ở route
      let routerFilename = `${rootEntry}${routesMain}${routersEntry}${path.sep}router-${apiSuffixName}.js`;
      console.log(
        "-->Created ROUTER file:",
        `${routerFilename}=${fs.existsSync(routerFilename)}`
      );

      // sửa soạn handlerName;
      let handlerName = `${convertPath2ObjectName(api)}Handler`;

      // lọc lấy các hàm xử lý của handler (không kể GET hay POST)
      let arrFunctions = arrayFunctionApis.filter(
        (x) => x[CFG_API.apiFieldName] === api
      );
      // tạo các file Handler để nhúng vào router
      // (công việc CHÍNH của DEV là soạn file Handler để trả kết quả theo chức năng)
      createHandlerFile(
        apiSuffixName,
        handlerName.charAt(0).toLocaleUpperCase() + handlerName.slice(1),
        arrFunctions
      );

      handlerExport += `\n    ${handlerName}: require(".${api}-handler"),\n`;

      // sửa soạn các lệnh GET:
      let GET = `
    // Các lệnh GET của ${api} này:

    GET: {`;

      GET += createApiFunctions(api, handlerName, arrayFunctionApis, "GET");

      GET += `
    },`;

      // sử soạn các lệnh POST:
      let POST = `
    // Các lệnh POST của ${api} này:

    POST: {`;

      POST += createApiFunctions(api, handlerName, arrayFunctionApis, "POST");

      POST += `
    },`;

      if (!fs.existsSync(routerFilename)) {
        fs.writeFileSync(
          routerFilename,
          `${headerAuto}
"use strict";

// ĐÂY LÀ ĐƯỜNG DẪN API như nào  thì khai như thế
// (xem đường dẫn khai ở tham số path trong file ./routes/api-api-2.0-socket-token.js gọi đến router này)
//và khai đúng như vậy
const API = "${api}";


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
    // phương thức xác thực bằng socketClient - nhớ định nghĩa kênh liên lạc socket
    , verifyToken
    // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
    // sử dụng hàm khai sẵn luôn đỡ mất công
    , expHandlers.checkErrorBeforeResource
];

// nhúng bộ phân quyền chức năng của user, user được cấp quyền mới được truy vấn api
const { checkRight } = require("../..${mainEntry}");
// chuỗi kiểm tra quyền hợp lệ như sau:
const verifyGrantedChain = [
    ...verifyTokenChain
    // trả kết quả req.functionCode = req.path 
    // (thay thế bằng hàm setRequestParameter bên trong (utils 0.0.26))
    // , expHandlers.setFunctionFromPath
    // chuẩn bị các tham số để xác thực quyền
    , checkRight(API)
    // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
    // sử dụng hàm khai sẵn luôn đỡ mất công
    , expHandlers.checkErrorBeforeResource
];

// ----- END PHÂN QUYỀN --- //


// bộ xử lý máy chủ trả kết quả xử lý hander
const { ${handlerName} } = require("../../handlers${handlersEntry}");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {
${GET}
${POST}
};
module.exports = (new Router(funcPaths, API)).getExpressRouter();`
        );
      }
    }
  }

  // 5. Tạo file index.js xuất bảng handlers cho router truy vấn

  let indexHandlerFileName = `${rootEntry}${handlersMain}${handlersEntry}${path.sep}index.js`;
  console.log(
    "-->Created index.js handler file:",
    `${indexHandlerFileName}=${fs.existsSync(indexHandlerFileName)}`
  );
  if (!fs.existsSync(indexHandlerFileName)) {
    fs.writeFileSync(
      indexHandlerFileName,
      `${headerAuto}
// Xuất bản các handler để các router nhúng vào gọi xử lý được
module.exports = {

${handlerExport}
}
        `
    );
  }

  // 7. tạo luôn một máy chủ mới theo thiết kế file liên kết với các routers đã tạo trên đây
  createServer(
    routeName,
    `.${routesMain}/${CFG_API.prefixRoute}-${routeName}.js`,
    port,
    baseDirectory
  );

  // 8. Tạo index entry cho các mô hình ở midlewares
  createEntryIndex(`${rootEntry}${path.sep}midlewares`, true);

  process.exit(0);
})();

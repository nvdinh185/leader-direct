// 1. tạo các thư mục cần thiết cho mô hình gồm:
/**
 * Đường dẫn gốc, rootEntry của dự án
 * Đường dẫn chính của các hàm model gồm:
 * -
 */
const { rootEntry, mainEntry } = require("../config/params");

// các đường dẫn và file mẫu
const subEntries = ["models", "queries", "config"];

const fs = require("fs");
const path = require("path");

console.log("***>", `${rootEntry}`);

let entries = mainEntry.split("/");
// lần lược tạo các đường dẫn
let entry = `${rootEntry}`;

// duyệt hết tạo đường dẫn chính
for (let i in entries) {
  let el = entries[i];
  if (el && el !== "." && el !== ".." && el !== "") {
    entry += `${path.sep}${el}`;
    console.log("-->", `${entry}`, fs.existsSync(entry));
    if (!fs.existsSync(entry)) {
      fs.mkdirSync(entry);
    }
  }
}

// duyệt các đường dẫn phụ để tạo tiếp đường dẫn phụ
for (let i in subEntries) {
  let el = subEntries[i];
  if (el && el !== "." && el !== ".." && el !== "") {
    // tạo đường dẫn nếu chưa có
    let subEntry = `${entry}${path.sep}${el}`;
    console.log("-->", `${subEntry}`, fs.existsSync(subEntry));
    if (!fs.existsSync(subEntry)) {
      fs.mkdirSync(subEntry);
    }
    // tạo file index tương ứng cho từng module
    let indexFile = `${subEntry}${path.sep}index.js`;
    console.log("-->", `${indexFile}`, fs.existsSync(indexFile));
    if (!fs.existsSync(indexFile)) {
      fs.writeFileSync(
        indexFile,
        `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq

` +
          (el === "config"
            ? `module.exports = require("../../../db/db-connection-pool-right");`
            : `// khai báo giao tiếp csdl
const db = require("../config");

module.exports = {
    ${
      el === "models"
        ? `jsonModels: require("./json-text-models"),\n    //organizations: new (require("./organizations"))(db),`
        : el === "queries"
        ? `joinQueries: new (require("./join-queries"))(db),\n    runSqls: new (require("./run-sqls"))(db),`
        : ``
    }
    // khai báo các model để xuất ra ngoài sử dụng
    //...
}`)
      );
    }

    // tạo các file mẫu cố định để tham chiếu khai báo
    if (el === "queries") {
      let queryFiles = [`join-queries.js`, `run-sqls.js`];
      for (let i in queryFiles) {
        let elFile = queryFiles[i];
        let indexFile = `${subEntry}${path.sep}${elFile}`;
        console.log("-->", `${indexFile}`, fs.existsSync(indexFile));
        if (!fs.existsSync(indexFile)) {
          fs.writeFileSync(
            indexFile,
            `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq

// Lớp đối tượng này sẽ chạy các câu lệnh sql, function riêng biệt cho csdl
class ${elFile === "join-queries.js" ? `JoinQueries` : `RunSql`} {
    constructor(db) {
        // giao tiếp csdl Database theo mô hình (không phụ thuộc loại csdl)
        this.dbModel = db;
        // csdl DAO nguyên thủy sử dụng như các phương thức cũ (phải biết rõ đang sử dụng loại csdl nào để sử dụng lệnh phù hợp)
        this.dbDAO = db.getDbInstance();
        // trường hợp muốn sử dụng phương thức runSql, hoặc runFunc, thì sử dụng this.db
    }

}

module.exports = ${elFile === "join-queries.js" ? `JoinQueries` : `RunSql`};`
          );
        }
      }
    }
  }

  // tạo file index chính tại ./midlewares/../index.js
  let indexFileMain = `${entry}${path.sep}index.js`;
  console.log("-->", `${indexFileMain}=${fs.existsSync(indexFileMain)}`);
  if (!fs.existsSync(indexFileMain)) {
    fs.writeFileSync(
      indexFileMain,
      `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq

// xuất bản mô hình ra ngoài để sử dụng
            
module.exports = {
    models: require("./models"),
    queries: require("./queries"),
    // nhúng các giao tiếp phát sinh nghiệp vụ riêng - user-right.js
    userRight: require("./user-right"),
    // nhúng handler để xử lý - phải tạo file granted-handler và các mô hình ở models.js - phần giao tiếp
    grantedHandler: require("./granted-handler"),
    // nhúng bộ kiểm tra quyền để đưa vào các router - phải tạo file granted-handler ở trên
    checkRight: require("./granted-handler").checkRight
}`
    );
  }

  // ......... thêm mới các thủ tục riêng
  
  // tạo file user-right.js để xác thực chức năng theo csdl - phải tạo mô hình mới có hiệu lực được
  let userRightFile = `${entry}${path.sep}user-right.js`;
  console.log("-->", `${userRightFile}=${fs.existsSync(userRightFile)}`);
  if (!fs.existsSync(userRightFile)) {
    fs.writeFileSync(
      userRightFile,
      `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq
  
// Đây là hàm kiểm tra quyền trong csdl 
// khai báo lại mô hình
const { function_apis, function_groups, function_granted } = require("./models");
// debug để check quyền
const isDebug = false;

/**
 * Kiểm tra quyền, bởi, phương thức, api, chức năng, và username
 * Ví dụ: POST, /api, /verify-proxy-token, cuong.dq
 *
 * @param {*} method
 * @param {*} api
 * @param {*} func
 * @param {*} username
 */
module.exports = async (method, api, func, username) => {
    try {
        // getApi
        let apiFuncs = await function_apis.getFirstRecord(
            {
                api_function: func
                , api_router: api
                , method
            }
            , {
                id: 1
                , has_token: 1
                , has_granted: 1
                , has_log: 1
                , status: 1
            }
        )
        // nếu không cần phân quyền cho chức năng này thì trả về true
        if (isDebug) console.log("TEST 1", apiFuncs);
        if (
            !apiFuncs ||
            (apiFuncs && !apiFuncs.has_granted) ||
            (apiFuncs && !apiFuncs.id)
        ) {
            return true;
        }
        // đây là id cần phải phân quyền thực hiện
        let fId = apiFuncs.id;
        if (isDebug) console.log("ID", fId);
        // lấy quyền được cấp cho user
        // trả về { function_groups: '[]', function_apis: '[]' }
        let objGranted = await function_granted.getFirstRecord({ username }, { function_groups: 1, function_apis: 1 })
        let userGranted = JSON.parse(
            JSON.stringify(objGranted
                , (key, value) => {
                    // chuyển đổi chuỗi thành array
                    if (value && (key === "function_groups"
                        || key === "function_apis"))
                        return JSON.parse(value);
                    // trả về giá trị cũ
                    return value;
                }))

        // nếu user chưa được cấp quyền thì trả về false
        if (isDebug) console.log("TEST 2", userGranted,);
        if (
            !userGranted ||
            (userGranted &&
                !userGranted.function_groups &&
                !userGranted.function_apis) ||
            (userGranted &&
                userGranted.function_groups &&
                !userGranted.function_groups.length &&
                userGranted.function_apis &&
                !userGranted.function_apis.length)
        ) {
            throw "Bạn không được cấp quyền thực hiện chức năng này-Granted";
        }
        // nếu chức năng đã được phân quyền thì trả về true
        if (isDebug) console.log("fIds", fId, userGranted.function_apis, typeof fId, typeof userGranted.function_apis);
        if (
            userGranted.function_apis &&
            (userGranted.function_apis.includes(fId)
                || userGranted.function_apis.includes(parseInt(fId)))
        ) {
            return true;
        }

        // nếu được phân quyền trong nhóm thì kiểm tra quyền trong nhóm
        if (userGranted.function_groups && userGranted.function_groups.length) {
            let arrGroups = await function_groups.getAllData(
                {
                    id: {
                        $in: userGranted.function_groups
                    }
                }
                , { function_apis: 1 }
            )

            let arrJson =
                JSON.parse(
                    JSON.stringify(arrGroups
                        , (key, value) => {
                            // chuyển đổi mảng chức năng thành array
                            if (key === "function_apis" && value) return JSON.parse(value);
                            return value;
                        }
                    )
                );
            // gộp các quyền với nhau
            let apis = arrJson.map(o => o["function_apis"]); //  [[{key:value},...],[{key:value},...]]=>[[value,...],[value,...]]
            let apisOfGroup = [].concat.apply([], apis);          //  [[],[]] => [];
            if (isDebug) console.log("APIS apisOfGroup", apisOfGroup);
            // kết quả trả về là [id1,id2,...]
            if (isDebug) console.log("GroupId - fid", apisOfGroup);
            if (apisOfGroup &&
                (
                    apisOfGroup.includes(fId)
                    || apisOfGroup.includes(parseInt(fId))
                )
            ) {
                return true;
            }
        }
    } catch (e) {
        // console.log(\`Lỗi kiểm tra quyền của user \${username}\`, e)
        throw \`Check user right of \${username} with error: \${e}\`;
    }
    throw "Bạn không được cấp quyền thực hiện chức năng này-ALL";
}`
    );
  }



  // tạo file grant-handler.js để giao tiếp với router-granted-handler.js thực thi các lệnh api functions - phải tạo mô hình mới có hiệu lực được
  let grantedHalderFile = `${entry}${path.sep}granted-handler.js`;
  console.log("-->", `${grantedHalderFile}=${fs.existsSync(grantedHalderFile)}`);
  if (!fs.existsSync(grantedHalderFile)) {
    fs.writeFileSync(
      grantedHalderFile,
      `// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq
  
/**
 * Giao tiếp bộ xử lý quyền của user
 * Bao gồm: kiểm tra quyền của user
 * Trả danh sách quyền, trả danh sách user, .... các hàm trong chức năng phân quyền giao tiếp với api
 * 
 */

const isDebug = false;

const userRight = require("./user-right");
const { function_apis, function_groups, function_granted } = require("./models");

class GrantedHandler {
  constructor() { }

  // kiểm tra quyền của một api theo các req đưa lên
  checkRight(api) {
    return (req, res, next) => {
      if (!req.user) {
        req.error = "Bạn phải cung cấp token với user hợp lệ trước khi kiểm tra quyền";
        next();
        return;
      }
      userRight(req.method, api, req.functionCode, req.user.username)
        .then(ok => {
          // trả về true thì đủ quyền
          if (isDebug) console.log("***>checkRight:", req.method, api, req.functionCode, req.user.username, ok);
          next();
        })
        .catch(err => {
          // lỗi quyền
          req.error = err;
          next();
        });
    }
  }

  // lấy danh sách chức năng
  getFunctions(req, res, next) {
    function_apis.getAllData({}
      , {}
      , { api_router: 1, method: 1, id: 1 }
    )
      .then(data => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  // Lấy nhóm quyền
  getGrantedGroups(req, res, next) {
    function_groups.getAllData({}
      , {}
      , {}
    )
      .then(data => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  // lấy các quyền của một group
  getGrantedGroup(req, res, next) {

    let { group_id } = req.paramS;

    if (!group_id) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    function_groups.getFirstRecord(
      { group_id }
      , {}
      , {}
    )
      .then(data => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  // lấy danh sách user được phân quyền
  getGrantedUsers(req, res, next) {
    function_granted.getAllData(
      {}
      , {}
      , {}
    )
      .then(data => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  // các quyền post


  // lấy quyền đã được phân cho username
  getGrantedUser(req, res, next) {
    let { username } = req.paramS;

    if (!username) {
      req.error = 'Không có dữ liệu theo yêu cầu';
      next();
      return;
    }
    function_granted.getFirstRecord(
      { username }
      , {}
      , {}
    )
      .then(data => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  // gán chức năng cho nhóm quyền
  grantFunction2Group(req, res, next) {
    if (!req.json_data) {
      req.error = 'Không có dữ liệu post lên';
      next();
      return;
    }
    let jsonGroup = {
      id: req.json_data.id,
      function_apis: JSON.stringify(req.json_data.function_apis)
    }

    if (!jsonGroup.id || !jsonGroup.function_apis || !req.user || !req.user.username) {
      req.error = 'Không có dữ liệu theo yêu cầu';
      next();
      return;
    }

    function_groups.updateOneRecord(jsonGroup,
      { id: jsonGroup.id }
    )
      .then(data => {
        // console.log('Data: ', data);
        req.finalJson = { status: "OK", message: "Cập nhập thành công", data };
        next();
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  // gán nhóm quyền cho user
  grantGroup2User(req, res, next) {

    if (!req.json_data) {
      req.error = 'Không có dữ liệu post lên';
      next();
      return;
    }
    let { username } = req.json_data;

    if (!username || !req.user || !req.user.username) {
      req.error = 'Không có dữ liệu theo yêu cầu';
      next();
      return;
    }

    let jsonData = {
      username,
      function_groups: JSON.stringify(req.json_data.function_groups)
    }

    // nếu chưa có user trong bảng thì tạo user
    function_granted.getFirstRecord({ username })
      .then(async grantedUser => {
        try {
          // console.log('grantedUser: ', grantedUser);
          if (!grantedUser || !grantedUser.username) {
            await function_granted.insertOneRecord({
              username
              , status: 1
              , updated_time: Date.now()
              , updated_user: req.user.username
            });
          }
          await function_granted.updateOneRecord(jsonData, { username });
          req.finalJson = { status: "OK", message: "Cập nhập thành công", data };
          next();

        } catch (e) {
          throw e;
        }
      })
      .catch(err => {
        console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }


  // gán chức năng cho user
  grantFunction2User(req, res, next) {

    if (!req.json_data) {
      req.error = 'Không có dữ liệu post lên';
      next();
      return;
    }
    let { username } = req.json_data;

    if (!username || !req.user || !req.user.username) {
      req.error = 'Không có dữ liệu theo yêu cầu';
      next();
      return;
    }

    let jsonData = {
      username,
      function_apis: JSON.stringify(req.json_data.function_apis)
    }

    // nếu chưa có user bảng ghi thì tạo
    function_granted.getFirstRecord({ username })
      .then(async grantedUser => {
        try {
          // console.log('grantedUser: ', grantedUser);
          if (!grantedUser || !grantedUser.username) {
            await function_granted.insertOneRecord({
              username
              , status: 1
              , updated_time: Date.now()
              , updated_user: req.user.username
            });
          }
          await function_granted.updateOneRecord(jsonData, { username });
          req.finalJson = { status: "OK", message: "Cập nhập thành công", data };
          next();

        } catch (e) {
          throw e;
        }
      })
      .catch(err => {
        console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

}

module.exports = new GrantedHandler();`
    );
  }

  // end of thủ tục tạo entry
}


// In dòng đường dẫn để tạo file model lưu lại copy vào tạo model
let fileModel = `.${mainEntry}/models/json-text-models.js`;
console.log("*** Save model to -->", fileModel);

process.exit(0);

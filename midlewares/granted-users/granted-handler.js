// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq
  
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

module.exports = new GrantedHandler();
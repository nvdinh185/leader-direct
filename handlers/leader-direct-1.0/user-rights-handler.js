// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-functions-granted-user-admin-users-socket-2020-11-24.xlsx
// Được tạo và lúc 2020-11-28 06:56:05

"use strict";

const {
  api_routers,
  function_apis,
  function_groups,
  function_granted,
  menu_apis,
  organizations,
} = require("../../midlewares/granted-users/models");

class UserRightsHandler {
  constructor() {}

  /**
   * (1) GET /sample-api/user-rights/get-functions
   *
   * Lấy danh sách chức năng
   * Trả về các chức năng cần phân quyền (has_granted), để thực hiện gán quyền cho nhóm quyền hoặc user
   *
   * - Yêu cầu CÓ TOKEN
   *
   * SAMPLE INPUTS:  "method=GET&api_router=user-rights&page=1&limit=100"
   */
  getFunctions(req, res, next) {
    // lọc theo nhóm api (nếu có) và phương thức GET hay POST
    let { method, api_router, page, limit } = req.paramS;

    page = page || 1;
    limit = limit || 100;

    // chỉ lọc những chức năng yêu cầu phân quyền để gán quyền thôi
    function_apis
      .getPage(
        {
          method,
          api_router,
          // has_granted: 1, // lấy tất cả
        },
        {
          _id: 0,
          id: 1,
          method: 1,
          base_directory: 1,
          api_router: 1,
          api_function: 1,
          has_token: 1,
          has_granted: 1,
          has_log: 1,
          form_data: 1,
          name: 1,
          description: 1,
          sample_data: 1,
          status: 1,
        },
        { api_router: 1, method: -1 }, // jsonSort = order by field_1 asc, field_2 desc
        { page, limit } // jsonPaging = limit 5 offset 0
      )
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (2) GET /sample-api/user-rights/get-granted-groups
   *
   * Lấy danh sách nhóm quyền
   * Trả về danh sách nhóm quyền
   *
   * - Yêu cầu CÓ TOKEN
   *
   * SAMPLE INPUTS:  "page=1&limit=100"
   */
  getGrantedGroups(req, res, next) {
    // lọc theo nhóm api (nếu có)
    let { page, limit } = req.paramS;

    page = page || 1;
    limit = limit || 100;

    // lấy tất cả nhóm quyền có trạng thái = 1 để phân quyền cho user
    function_groups
      .getPage(
        { status: 1 },
        {},
        { id: 1 },
        { limit, page } // jsonPaging = limit 5 offset 0
      )
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (3) GET /sample-api/user-rights/get-granted-group
   *
   * Lấy các quyền của một group
   * Trả về quyền của một nhóm ?group_id=1
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  [ "id=1&page=1&limit=100","id=2&page=1&limit=100", "id=3" ]
   */
  getGrantedGroup(req, res, next) {
    // trang chức năng được phân quyền trả về
    let { id, page, limit } = req.paramS;

    page = page || 1;
    limit = limit || 100;

    // ràng buộc kiểm tra dữ liệu yêu cầu
    if (!id) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    function_groups
      .getFirstRecord({ id }, { id: 1, function_apis: 1, name: 1, status: 1 })
      .then(async (group) => {
        // sẽ trả về nhóm chức năng '[]'
        if (!group || !group.function_apis) {
          req.error = "Nhóm chức năng không tìm thấy quyền hạn nào";
          next();
          return;
        }

        let funcs = JSON.parse(group.function_apis);
        // đọc hết nhóm quyền trong function_apis để trả kết quả về
        let data = await function_apis.getPage(
          { id: { $in: funcs } },
          {
            id: 1,
            method: 1,
            // base_directory: 1,
            api_router: 1,
            api_function: 1,
            // has_token: 1,
            // has_granted: 1,
            // has_log: 1,
            // form_data: 1,
            name: 1,
            // description: 1,
            status: 1,
          },
          {},
          { page, limit }
        );
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (4) GET /sample-api/user-rights/get-granted-users
   *
   * Lấy danh sách user được phân quyền
   * Trả về danh sách user được phân quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  "page=1&limit=100"
   */
  getGrantedUsers(req, res, next) {
    let { page, limit } = req.paramS;

    page = page || 1;
    limit = limit || 100;

    function_granted
      .getPage(
        {},
        {
          username: 1,
          function_groups: 1,
          function_apis: 1,
          organization: 1,
          menus_granted: 1,
          description: 1,
          updated_time: 1,
          updated_user: 1,
          status: 1,
        },
        { username: 1 }, // jsonSort = order by field_1 asc, field_2 desc
        { limit, page }
      )
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (5) GET /sample-api/user-rights/get-granted-user
   *
   * Lấy quyền của một user
   * Trả về quyền của một user
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  ["username=0903500888&page=1&limit=100" , "username=cuong.dq&page=1&limit=100", "username=0123456789"]
   */
  getGrantedUser(req, res, next) {
    let username = req.user.username;

    let page = 1;
    let limit = 100;

    // ràng buộc kiểm tra dữ liệu yêu cầu
    if (!username) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    function_granted
      .getFirstRecord(
        { username },
        {
          username: 1,
          organization: 1,
          menus_granted: 1,
          function_groups: 1,
          function_apis: 1,
          description: 1,
          updated_time: 1,
          updated_user: 1,
          status: 1,
        }
      )
      .then(async (granted) => {
        // sẽ trả về các quyền của nhóm và quyền của chức năng '[]'
        if (!granted || (!granted.function_groups && !granted.function_apis)) {
          req.error = "User chưa được phân quyền";
          next();
          return;
        }

        // lấy tất cả các nhóm của user được phân
        let groupIds = granted.function_groups ? JSON.parse(granted.function_groups) : [];
        // lấy danh sách các nhóm chức năng
        let groups = await function_groups.getAllData({ id: { $in: groupIds } }, { function_apis: 1 });

        let funcsGroup = [];
        for (let group of groups) {
          if (group.function_apis) {
            let funcGroup = JSON.parse(group.function_apis);
            funcsGroup = funcsGroup.concat(funcGroup);
          }
        }

        // lấy các chức năng
        let funcs = granted.function_apis ? JSON.parse(granted.function_apis) : [];

        // đọc hết nhóm quyền trong function_apis để trả kết quả về
        let functions = await function_apis.getPage(
          {
            id: {
              $in: [...new Set([...funcs, ...funcsGroup])],
            },
          },
          {
            id: 1,
            method: 1,
            // base_directory: 1,
            api_router: 1,
            api_function: 1,
            // has_token: 1,
            // has_granted: 1,
            // has_log: 1,
            // form_data: 1,
            name: 1,
            // description: 1,
            status: 1,
          },
          {},
          { page, limit }
        );
        functions.username = granted.username;

        req.finalJson = {
          ...functions,
          // chỉ trả độ dài id duy nhất thôi
          length: [...new Set([...funcs, ...funcsGroup])].length,
        };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (6) POST /sample-api/user-rights/grant-functions-2-group
   *
   * Gán các chức năng cho nhóm quyền
   * Phân quyền chức năng cho nhóm quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  [{"id":1, "function_apis":[3,4,7,8,9,10,11,12,13,14,15,16,17,18]} , {"id":2, "function_apis":[3,4,7,8,9,10]} , {"id":3, "function_apis":[11,12,13,14,15,16,17,18]}]
   */
  grantFunctions2Group(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let { id, function_apis, menus_granted } = req.json_data; // truyền lên là {id, function_apis:[]}

    if (!id || !function_apis || !menus_granted) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    // tìm kiếm nhóm chức năng có chưa? nếu chưa có thì bổ sung nếu có rồi thì cập nhập
    function_groups
      .getFirstRecord({ id }, { id: 1 })
      .then(async (data) => {
        console.log("Data: ", data);
        let jsonData = {
          function_apis: function_apis,
          menus_granted: menus_granted,
          status: req.json_data.status,
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!data || !data.id) {
          await function_groups.insertOneRecord({ ...jsonData, id }).catch((err) => {
            throw err;
          });
        } else {
          await function_groups.updateOneRecord(jsonData, { id }).catch((err) => {
            throw err;
          });
        }
        req.finalJson = {
          status: "OK",
          message: `Cập nhập nhóm quyền ${id} cho bảng function_groups thành công với các quyền như function_apis`,
          function_apis,
        };
        next();
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
        req.error = err;
        next();
      });
  }

  /**
   * (7) POST /sample-api/user-rights/grant-groups-2-user
   *
   * Gán nhóm quyền cho user
   * Phân quyền cho user theo nhóm quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  [ {"username":"0903500888", "function_groups":[1]} , {"username":"0903500888", "function_groups":[2]} , {"username":"0903500888", "function_groups":[1,2]} ]
   */
  grantGroups2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let { username, function_groups } = req.json_data;

    if (!req.user || !username || !function_groups || !Array.isArray(function_groups)) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // kiểm tra username có không? nếu không có thì chèn vào, nếu có rồi thì update
    function_granted
      .getFirstRecord({ username })
      .then(async (user) => {
        let jsonData = {
          function_groups: JSON.stringify(function_groups),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!user || !user.username) {
          // user chưa được tạo trong phân quyền thì chèn vào
          await function_granted.insertOneRecord({ ...jsonData, username }).catch((err) => {
            throw err;
          });
        } else {
          // đã tồn tại một bảng ghi theo username này
          await function_granted.updateOneRecord(jsonData, { username }).catch((err) => {
            throw err;
          });
        }
        req.finalJson = {
          status: "OK",
          message: `Phân NHÓM quyền ${JSON.stringify(function_groups)} cho user ${username} thành công`,
        };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (8) POST /sample-api/user-rights/grant-functions-2-user
   *
   * Gán các chức năng cho user
   * Phân quyền cho user theo chức năng đơn lẻ
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  [{"username":"0903500888", "function_apis": [9] }]
   */
  grantFunctions2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let { username, function_apis } = req.json_data;

    if (!req.user || !username || !function_apis || !Array.isArray(function_apis)) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // kiểm tra username có không? nếu không có thì chèn vào, nếu có rồi thì update
    function_granted
      .getFirstRecord({ username })
      .then(async (user) => {
        let jsonData = req.json_data;

        if (!user || !user.username) {
          // user chưa được tạo trong phân quyền thì chèn vào
          await function_granted.insertOneRecord({ ...jsonData, username }).catch((err) => {
            throw err;
          });
        } else {
          // đã tồn tại một bảng ghi theo username này
          await function_granted.updateOneRecord(jsonData, { username }).catch((err) => {
            throw err;
          });
        }
        req.finalJson = {
          status: "OK",
          message: `Phân quyền ${JSON.stringify(function_apis)} cho user ${username} thành công`,
        };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (9) GET /sample-api/user-rights/get-api-routers
   *
   * Lấy danh sách các nhóm api router
   * Trả về danh sách các nhóm chức năng API
   *
   * - Yêu cầu CÓ TOKEN
   *
   * SAMPLE INPUTS:  "page=1&limit=100"
   */
  getApiRouters(req, res, next) {
    // lọc trang nếu nhiều
    let { page, limit } = req.paramS;

    page = page || 1;
    limit = limit || 100;

    api_routers
      .getPage(
        {}, // jsonWhere  = where key = 'value'
        {}, // jsonFields = list field to select
        {}, // jsonSort = order by field_1 asc, field_2 desc
        { page, limit } // jsonPaging = limit 5 offset 0
      )
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (10) POST /sample-api/user-rights/add-function-2-group
   *
   * Bổ sung 1 quyền cho group API
   * User chỉ gửi api_function và method yêu cầu add vào group id
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"id":4,"method":"GET","api_function":"/grant-functions-2-group"}
   */
  addFunction2Group(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { id, method, api_function } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!id || !method || !api_function) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    function_groups
      .getFirstRecord(
        { id }, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        { id: 1, function_apis: 1, name: 1 } // jsonFields = list field to select field_1, field_2 from <table>
      )
      .then(async (data) => {
        let fApi = await function_apis.getFirstRecord({ method, api_function }, { id: 1 }).catch((error) => {
          throw error;
        });

        if (!fApi || !fApi.id) {
          req.error = `Không tìm thấy chức năng nào theo method=${method} và api_function=${api_function}`;
          next();
          return;
        }

        if (!data || !data.id) {
          req.error = `Không tìm thấy nhóm quyền id=${id}`;
          next();
          return;
        }

        let tApis = [];
        try {
          tApis = data.function_apis ? JSON.parse(data.function_apis) : [];
        } catch {
          tApis = [];
        }

        let fApis = [...new Set([...tApis, ...[fApi.id]])];

        let jsonData = {
          function_apis: JSON.stringify(fApis),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        // dữ liệu có tìm thấy theo id, thực hiện update theo id
        await function_groups.updateOneRecord(jsonData, { id }).catch((err) => {
          throw err;
        });

        req.finalJson = {
          status: "OK",
          message: `Đã bổ sung quyền (${fApi.id}) ${method} ${api_function} cho nhóm quyền ${id} thành công`,
        };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (11) POST /sample-api/user-rights/remove-function-2-group
   *
   * Thu hồi 1 quyền cho group API
   * User chỉ gửi api_function và method yêu cầu remove khỏi group_id
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"id":4,"method":"GET","api_function":"/grant-functions-2-group"}
   */
  removeFunction2Group(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { id, method, api_function } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!id || !method || !api_function) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    function_groups
      .getFirstRecord(
        { id }, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        { id: 1, function_apis: 1, name: 1 } // jsonFields = list field to select field_1, field_2 from <table>
      )
      .then(async (data) => {
        let fApi = await function_apis.getFirstRecord({ method, api_function }, { id: 1 }).catch((error) => {
          throw error;
        });

        if (!fApi || !fApi.id) {
          req.error = `Không tìm thấy chức năng nào theo method=${method} và api_function=${api_function}`;
          next();
          return;
        }

        if (!data || !data.id) {
          req.error = `Không tìm thấy nhóm quyền id=${id}`;
          next();
          return;
        }

        let tApis = [];
        try {
          tApis = data.function_apis ? JSON.parse(data.function_apis) : [];
        } catch {
          tApis = [];
        }

        let idx = tApis.findIndex((x) => x === fApi.id);

        if (idx > -1) tApis.splice(idx, 1);

        let fApis = [...tApis];

        let jsonData = {
          function_apis: JSON.stringify(fApis),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        // dữ liệu có tìm thấy theo id, thực hiện update theo id
        await function_groups.updateOneRecord(jsonData, { id }).catch((err) => {
          throw err;
        });

        req.finalJson = {
          status: "OK",
          message: `Đã thu hồi quyền (${fApi.id}) ${method} ${api_function} của nhóm quyền ${id} thành công`,
        };
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (12) POST /sample-api/user-rights/add-function-2-user
   *
   * Bổ sung 1 quyền API cho user
   * User chỉ gửi api_function và method yêu cầu add vào function_apis của user
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0903500888","method":"GET","api_function":"/grant-functions-2-group"}
   */
  addFunction2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { username, method, api_function } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username || !method || !api_function) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    function_granted
      .getFirstRecord({ username }, { username: 1, function_apis: 1 })
      .then(async (data) => {
        let fApi = await function_apis.getFirstRecord({ method, api_function }, { id: 1 }).catch((error) => {
          throw error;
        });

        if (!fApi || !fApi.id) {
          req.error = `Không tìm thấy chức năng nào theo method=${method} và api_function=${api_function}`;
          next();
          return;
        }

        let tApis = [];
        try {
          tApis = data.function_apis ? JSON.parse(data.function_apis) : [];
        } catch {
          tApis = [];
        }

        let fApis = [...new Set([...tApis, ...[fApi.id]])];

        let jsonData = {
          function_apis: JSON.stringify(fApis),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!data || !data.username) {
          await function_granted.insertOneRecord({ ...jsonData, username }).catch((err) => {
            throw err;
          });
        } else {
          // dữ liệu có tìm thấy theo id, thực hiện update theo id
          await function_granted.updateOneRecord(jsonData, { username }).catch((err) => {
            throw err;
          });
        }

        req.finalJson = {
          status: "OK",
          message: `Đã thêm quyền (${fApi.id}) ${method} ${api_function} cho user ${username} thành công`,
        };
        next();
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
        req.error = err;
        next();
      });
  }

  /**
   * (13) POST /sample-api/user-rights/remove-function-2-user
   *
   * Thu hồi 1 quyền API cho user
   * User chỉ gửi api_function và method yêu cầu remove khỏi function_aps của user
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0903500888","method":"GET","api_function":"/grant-functions-2-group"}
   */
  removeFunction2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { username, method, api_function } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username || !method || !api_function) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    function_granted
      .getFirstRecord(
        { username }, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        { username: 1, function_apis: 1 } // jsonFields = list field to select field_1, field_2 from <table>
      )
      .then(async (data) => {
        let fApi = await function_apis.getFirstRecord({ method, api_function }, { id: 1 }).catch((error) => {
          throw error;
        });

        if (!fApi || !fApi.id) {
          req.error = `Không tìm thấy chức năng nào theo method=${method} và api_function=${api_function}`;
          next();
          return;
        }

        if (!data || !data.username) {
          req.error = `Không tìm thấy username = ${username}`;
          next();
          return;
        }

        let tApis = [];
        try {
          tApis = data.function_apis ? JSON.parse(data.function_apis) : [];
        } catch {
          tApis = [];
        }

        let idx = tApis.findIndex((x) => x === fApi.id);

        if (idx > -1) tApis.splice(idx, 1);

        let fApis = [...tApis];

        let jsonData = {
          function_apis: JSON.stringify(fApis),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        // dữ liệu có tìm thấy theo id, thực hiện update theo id
        await function_granted.updateOneRecord(jsonData, { username }).catch((err) => {
          throw err;
        });

        req.finalJson = {
          status: "OK",
          message: `Đã thu hồi quyền (${fApi.id}) ${method} ${api_function} của user ${username} thành công`,
        };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (14) POST /sample-api/user-rights/grant-function-root-2-user
   *
   * Gán quyền root API cho user
   * Select toàn bộ has_granted bổ sung vào function_groups id =99 tất cả các quyền. Sau đó gán cho user ở trường function_groups
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0903500888"}
   */
  grantFunctionRoot2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { username } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    function_apis
      .getAllData(
        { has_granted: 1 }, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        { id: 1 }, // jsonFields = list field to select field_1, field_2 from <table>
        { id: 1 } // jsonSort = order by field_1 asc, field_2 desc
      )
      .then(async (apis) => {
        let fApi = apis.map((o) => o["id"]);

        // console.log("**99", fApi);

        let g99 = await function_groups.getFirstRecord({ id: 99 }, { id: 1, function_apis: 1 }).catch((error) => {
          throw error;
        });

        let jsonData = {
          function_apis: JSON.stringify(fApi),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!g99 || !g99.id) {
          await function_groups.insertOneRecord({ id: 99, ...jsonData, name: "Nhóm 99 giành cho DEV" }).catch((error) => {
            throw error;
          });
        } else {
          await function_groups.updateOneRecord({ ...jsonData }, { id: 99 }).catch((err) => {
            throw err;
          });
        }

        let fGroup = [];
        let jsonUser = {
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        let user = await function_granted.getFirstRecord({ username }, { username: 1, function_groups: 1 }).catch((err) => {
          throw err;
        });

        if (!user || !user.username) {
          fGroup = [99];
          await function_granted
            .insertOneRecord({
              username,
              ...jsonUser,
              function_groups: JSON.stringify(fGroup),
            })
            .catch((error) => {
              throw error;
            });
        } else {
          try {
            fGroup = JSON.parse(user.function_groups) || [];
          } catch {
            fGroup = [];
          }

          fGroup = [...new Set([...fGroup, ...[99]])];

          await function_granted
            .updateOneRecord(
              {
                ...jsonUser,
                function_groups: JSON.stringify(fGroup),
              },
              { username }
            )
            .catch((err) => {
              throw err;
            });
        }

        // console.log('Data: ', data);
        req.finalJson = {
          status: "OK",
          message: `Bạn đã gán quyền function root (99) ${JSON.stringify(fGroup)} cho user ${username}`,
        };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (15) POST /sample-api/user-rights/revoke-function-root-2-user
   *
   * Thu hồi quyền root của user
   * Thu hồi nhóm quyền root (tức là xóa nhóm 99 trong user)
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0903500888"}
   */
  revokeFunctionRoot2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { username } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    function_granted
      .getFirstRecord({ username }, { username: 1, function_groups: 1 })
      .then(async (user) => {
        if (!user || !user.username) {
          req.error = "User bạn muốn thu quyền không tồn tại";
          next();
          return;
        } else {
          let fGroup = [];
          try {
            fGroup = JSON.parse(user.function_groups) || [];
          } catch {
            fGroup = [];
          }

          let idx = fGroup.findIndex((x) => x === 99);
          if (idx > -1) fGroup.splice(idx, 1);

          await function_granted
            .updateOneRecord(
              {
                updated_time: Date.now(),
                updated_user: req.user.username,
                function_groups: JSON.stringify(fGroup),
              },
              { username }
            )
            .catch((err) => {
              throw err;
            });
        }

        // console.log('Data: ', data);
        req.finalJson = { status: "OK", message: `Bạn đã thu hồi quyền function root (99) của user ${username} thành công` };
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (16) POST /socket/user-rights/import-function-apis
   *
   * Import danh sách Api mới
   * Khi có Api mới - csdl không cần tạo lại, chỉ cần import danh sách api mới là đc
   * Sau khi import xong, phải tạo các api trong routers và hàm xử lý trong handlers phù hợp với api mới
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  importFunctionApis(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    // model là tên bảng, datas là mảng chứa danh sách cần import, where_keys là các trường khi trùng thì cho update theo where nếu có
    let { datas, where_keys, group_count } = req.json_data;

    // số lượng commit đồng thời khi import
    let GROUP_COUNT = group_count || 100;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!datas || !Array.isArray(datas)) {
      req.error = "Không có dữ liệu theo yêu cầu là { datas } ";
      next();
      return;
    }

    // xác định user đã login
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    let jsonTableStructure = function_apis.getStructure();
    let arrJson = [];
    // duyệt tất cả các bảng ghi của datas, trùng với kiểu dữ liệu, chuyển đổi sang kiểm dữ liệu trước khi đưa vào
    for (let data of datas) {
      if (typeof data === "object" && Object.keys(data).length > 0) {
        let jsonData = {};
        for (let key in data) {
          if (jsonTableStructure[key]) {
            let value = data[key];
            jsonData[key] = value;
            if (value && typeof value !== "string" && typeof value !== "number") {
              // chuyển các loại dữ liệu khác ra string trước khi chèn vào mô hình
              jsonData[key] = JSON.stringify(value);
            }
          }
        }
        arrJson.push(jsonData);
      }
    }

    if (where_keys && Array.isArray(where_keys) && where_keys.length) {
      // nếu có mệnh đề where thì cho update
      // thực hiện import 100 bảng ghi cùng lúc, cho đến khi hết số lượng bảng ghi
      function_apis
        .importRowsUpdates(
          arrJson.filter((x) => Object.keys(x).length > 0),
          where_keys,
          GROUP_COUNT
        )
        .then((results) => {
          let message = "Đã import dữ liệu theo kết quả ở trường results";
          // console.log('Data: ', results);
          req.finalJson = {
            status: "OK",
            message,
            results,
          };
          next();
        })
        .catch((err) => {
          // console.log('Lỗi: ', err);
          req.error = err;
          next();
        });
    } else {
      // nếu không có mệnh đề where thì chỉ insert
      function_apis
        .importRows(
          arrJson.filter((x) => Object.keys(x).length > 0),
          GROUP_COUNT
        )
        .then((results) => {
          let message = "Đã import dữ liệu theo kết quả ở trường results";
          // console.log('Data: ', results);
          req.finalJson = {
            status: "OK",
            message,
            results,
            // , datas: arrJson
          };
          next();
        })
        .catch((err) => {
          // console.log('Lỗi: ', err);
          req.error = err;
          next();
        });
    }
  }

  /**
   * (16) GET /lucky-draw/user-rights/get-online-tokens
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getOnlineTokens(req, res, next) {
    return require("../../midlewares/verify-token").getOnlineTokens(req, res, next);
  }

  /**
   * (51) GET /leader-direct/user-rights/get-function-group
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getFunctionGroup(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let { id } = req.json_data;

    function_groups
      .getFirstRecord({ id }, {})
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (52) POST /leader-direct/user-rights/create-function-group
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createFunctionGroup(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date(), update_user: req.user.username, status: 1 };
    // console.log(jsonData);
    function_groups
      .insertOneRecord(jsonData)
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (53) POST /leader-direct/user-rights/update-function-group
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateFunctionGroup(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    // console.log(jsonData);
    function_groups
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (54) POST /leader-direct/user-rights/get-menu-api
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getMenuApi(req, res, next) {
    menu_apis
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (55) POST /leader-direct/user-rights/create-menu-api
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createMenuApi(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date(), updated_user: req.user.username, status: 1 };

    menu_apis
      .insertOneRecord(jsonData)
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (56) POST /leader-direct/user-rights/update-menu-api
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateMenuApi(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date(), updated_user: req.user.username };

    menu_apis
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (57) POST /leader-direct/user-rights/get-function-granted
   *
   * Lấy danh sách token đang online
   * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getFunctionGranted(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let { username } = req.json_data;

    function_granted
      .getFirstRecord({ username }, {})
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.finalJson = err;
        next();
      });
  }

  /**
   * (18) GET /tttm-apis/user-rights/get-function-api/:id
   *
   * Lấy chi tiết hàm Api theo Id
   * Trả về hàm API để xem tính năng là gì, hoặc để tạo form nhập liệu động
   *
   * - Yêu cầu CÓ TOKEN
   *
   * SAMPLE INPUTS:
   */
  getFunctionApiId(req, res, next) {
    let { id } = req.params;

    if (!id) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    function_apis
      .getFirstRecord({ id })
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (58) POST /leader-direct/api/get-organizations
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getOrganizations(req, res, next) {
    organizations
      .getAllData()

      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (59) POST /leader-direct/api/create-organization
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createOrganization(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, created_time: new Date(), updated_time: new Date(), updated_user: req.user.username };
    jsonData.created_time = new Date().getTime();

    // chèn một bảng ghi vào csdl
    organizations
      .insertOneRecord(
        jsonData // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
      )
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (60) POST /leader-direct/api/update-organization
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateOrganization(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date(), updated_user: req.user.username };

    // update 1 bảng ghi vào csdl
    organizations
      .updateOneRecord(
        jsonData, // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        { id: jsonData.id } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
      )
      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (61) POST /leader-direct/api/get-users
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getUsers(req, res, next) {
    function_granted
      .getAllData()

      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (62) POST /leader-direct/api/create-user
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createUser(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = {
      ...req.json_data,
      updated_time: new Date(),
      updated_user: req.user.username,
      status: 1,
    };

    // chèn một bảng ghi vào csdl
    function_granted
      .insertOneRecord(
        jsonData // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
      )
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }

  /**
   * (63) POST /leader-direct/api/update-user
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateUser(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date(), updated_user: req.user.username };

    // update 1 bảng ghi vào csdl
    function_granted
      .updateOneRecord(
        jsonData, // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        { id: jsonData.id } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
      )
      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }
}

module.exports = new UserRightsHandler();

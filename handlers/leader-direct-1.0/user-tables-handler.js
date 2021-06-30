// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./test/create-api-functions/excel/api-functions-granted-user-dynamic-models.xlsx
// Được tạo và lúc 2020-11-06 23:25:19

"use strict";

const midlewares = require(`../../midlewares`);

// lấy các mô hình cố định của hệ thống trước
const {
  function_granted,
  table_groups,
  table_models,
} = midlewares.grantedUsers.models;

const TABLE_PRIVILEGES = "CRUD".split("");

// hàm kiểm tra quyền tác động đến bảng trực tiếp (CRUD) - tương ứng cho các hàm:
//  C = import/insert,
//  R = get/post-page, get/post-1-record
//  U = Update
//  D = Delete
// nếu user không được cấp quyền tác động CRUD ở bảng nào thì sẽ từ chối quyền

class UserTablesHandler {
  constructor() {}

  /**
   * (21) POST /ccdc-tscd/user-tables/edit-table-name/:model_name/:table_name
   *
   * Sửa tên bảng trong table_models
   * Sửa tên của bảng để theo dõi phân quyền cho dễ
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"name":"Sử dụng để làm gì đây"}
   */
  editTableModelsModelnameTablename(req, res, next) {
    // lấy tham số từ đường dẫn path
    if (!req || !req.params) {
      return {
        message: "Không tìm thấy tham số mô hình",
      };
    }
    let { model_name, table_name } = req.params;

    if (!model_name || table_name) {
      req.error = "Không tìm thấy mô hình cùng tên bảng";
      next();
      return;
    }

    // lấy tham số từ json post lên
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    // lấy 2 tham số là tên và trạng thái
    // nếu trạng thái là undifine thì thôi, nếu là = 0 hoặc 1 thì update
    let { name, status } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!name) {
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

    table_models
      .getFirstRecord(
        { model_name, table_name },
        { id: 1, model_name: 1, table_name: 1 }
      )
      .then(async (data) => {
        let jsonData = {
          name,
          updated_time: Date.now(),
          updated_user: req.user.username,
          status,
        };
        if (!data || !data.id) {
          throw `Bảng ${model_name}/${table_name} không tìm thấy trong mô hình`;
        } else {
          await table_models
            .updateOneRecord({ ...jsonData }, { id: data.id })
            .catch((err) => {
              throw err;
            });
        }
        // console.log('Data: ', data);
        req.finalJson = {
          status: "OK",
          message: `Thay đổi tên và trạng thái bảng ${model_name}/${table_name} THÀNH CÔNG!`,
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
   * (22) POST /ccdc-tscd/user-tables/add-table-2-group
   *
   * Bổ sung 1 quyền cho group Table
   * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng group_id, kiểm tra và bổ sung vào group_id quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"id":101,"privileges":"CRUD","model_name":"granted-users","table_name":"tables"}
   */
  addTable2Group(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { id, privileges, model_name, table_name } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!id || !privileges || !model_name || !table_name) {
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
    table_groups
      .getFirstRecord({ id }, { id: 1, table_models: 1 })
      .then(async (data) => {
        let tModel = await table_models
          .getFirstRecord({ model_name, table_name }, { id: 1 })
          .catch((error) => {
            throw error;
          });

        if (!tModel || !tModel.id) {
          req.error = `Không tìm thấy bảng nào theo model_name=${model_name} và table_name=${table_name}`;
          next();
          return;
        }

        // tránh báo lỗi dịch định dạng không đúng
        let CRUDs = {};
        try {
          CRUDs =
            data && data.table_models ? JSON.parse(data.table_models) : {};
        } catch {
          CRUDs = {};
        }

        // có quyền
        // privileges , CRUD
        // CRUDs = {"C":[1,2,3,4,5,6,7,8], "R":[1,2,3,4,5,6,7,8], "U":[1,2,3,4,5,6,7,8], "D":[1,2,3,4,5,6,7,8]}

        // nếu người dùng truyền lên quyền khác CRUD thì bỏ đi, chỉ lấy trong CRUD thôi
        let uPs = privileges.split("");
        for (let key of uPs) {
          if (TABLE_PRIVILEGES.includes(key)) {
            if (CRUDs[key] && Array.isArray(CRUDs[key])) {
              CRUDs[key] = [...new Set([...CRUDs[key], ...[tModel.id]])];
            } else {
              CRUDs[key] = [tModel.id];
            }
          }
        }
        // kết quả của CRUDs = {C:[...],R:[...],U:[...],D:[...]}
        // console.log("***> CRUDs", CRUDs);

        let jsonData = {
          table_models: JSON.stringify(CRUDs),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!data || !data.id) {
          // chưa có nhóm thì chèn vào
          await table_groups
            .insertOneRecord({ ...jsonData, id })
            .catch((err) => {
              throw err;
            });
        } else {
          // dữ liệu có tìm thấy theo id, thực hiện update theo id
          await table_groups.updateOneRecord(jsonData, { id }).catch((err) => {
            throw err;
          });
        }

        req.finalJson = {
          status: "OK",
          message: `Đã bổ sung quyền ${privileges} ${model_name}/${table_name} cho nhóm quyền ${id} trong table_groups thành công`,
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
   * (23) POST /ccdc-tscd/user-tables/remove-table-2-group
   *
   * Thu hồi 1 quyền cho group Table
   * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng group_id, kiểm tra và xóa khỏi group_id quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"id":101,"privileges":"CRUD","model_name":"granted-users","table_name":"tables"}
   */
  removeTable2Group(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { id, privileges, model_name, table_name } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!id || !privileges || !model_name || !table_name) {
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
    table_groups
      .getFirstRecord({ id }, { id: 1, table_models: 1 })
      .then(async (data) => {
        // tránh báo lỗi không có đối tượng
        if (!data || !data.id || !data.table_models) {
          req.error = `Không tìm thấy nhóm quyền ${id} trong bảng table_groups`;
          next();
          return;
        }

        let tModel = await table_models
          .getFirstRecord({ model_name, table_name }, { id: 1 })
          .catch((error) => {
            throw error;
          });

        if (!tModel || !tModel.id) {
          req.error = `Không tìm thấy bảng ghi nào theo model_name=${model_name} và table_name=${table_name}`;
          next();
          return;
        }

        // tránh báo lỗi dịch định dạng không đúng
        let CRUDs = {};
        try {
          CRUDs =
            data && data.table_models ? JSON.parse(data.table_models) : {};
        } catch {
          CRUDs = {};
        }

        // có quyền
        // privileges , CRUD
        // CRUDs = {"C":[1,2,3,4,5,6,7,8], "R":[1,2,3,4,5,6,7,8], "U":[1,2,3,4,5,6,7,8], "D":[1,2,3,4,5,6,7,8]}

        // nếu người dùng truyền lên quyền khác CRUD thì bỏ đi, chỉ lấy trong CRUD thôi
        let uPs = privileges.split("");
        for (let key of uPs) {
          if (TABLE_PRIVILEGES.includes(key)) {
            if (CRUDs[key] && Array.isArray(CRUDs[key])) {
              let idx = CRUDs[key].findIndex((x) => x === tModel.id);
              if (idx > -1) CRUDs[key].splice(idx, 1);
            }
          }
        }
        // kết quả của CRUDs = {C:[...],R:[...],U:[...],D:[...]}
        // console.log("***> CRUDs thu hồi xong", CRUDs);

        let jsonData = {
          table_models: JSON.stringify(CRUDs),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        // dữ liệu có tìm thấy theo id, thực hiện update theo id
        await table_groups.updateOneRecord(jsonData, { id }).catch((err) => {
          throw err;
        });

        req.finalJson = {
          status: "OK",
          message: `Đã thu hồi quyền ${privileges} ${model_name}/${table_name} của nhóm quyền ${id} trong table_groups thành công`,
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
   * (24) POST /ccdc-tscd/user-tables/add-table-2-user
   *
   * Bổ sung 1 quyền Table
   * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng username kiểm tra và bổ sung vào username quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0123456789","privileges":"CRUD","model_name":"granted-users","table_name":"tables"}
   */
  addTable2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { username, privileges, model_name, table_name } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username || !privileges || !model_name || !table_name) {
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
      .getFirstRecord({ username }, { username: 1, table_models: 1 })
      .then(async (data) => {
        let tModel = await table_models
          .getFirstRecord({ model_name, table_name }, { id: 1 })
          .catch((error) => {
            throw error;
          });

        if (!tModel || !tModel.id) {
          req.error = `Không tìm thấy bảng nào theo model_name=${model_name} và table_name=${table_name}`;
          next();
          return;
        }

        // tránh báo lỗi dịch định dạng không đúng
        let CRUDs = {};
        try {
          CRUDs =
            data && data.table_models ? JSON.parse(data.table_models) : {};
        } catch {
          CRUDs = {};
        }

        // có quyền
        // privileges , CRUD
        // CRUDs = {"C":[1,2,3,4,5,6,7,8], "R":[1,2,3,4,5,6,7,8], "U":[1,2,3,4,5,6,7,8], "D":[1,2,3,4,5,6,7,8]}

        // nếu người dùng truyền lên quyền khác CRUD thì bỏ đi, chỉ lấy trong CRUD thôi
        let uPs = privileges.split("");
        for (let key of uPs) {
          if (TABLE_PRIVILEGES.includes(key)) {
            if (CRUDs[key] && Array.isArray(CRUDs[key])) {
              CRUDs[key] = [...new Set([...CRUDs[key], ...[tModel.id]])];
            } else {
              CRUDs[key] = [tModel.id];
            }
          }
        }
        // kết quả của CRUDs = {C:[...],R:[...],U:[...],D:[...]}
        // console.log("***> CRUDs", CRUDs, data);

        let jsonData = {
          table_models: JSON.stringify(CRUDs),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!data || !data.username) {
          // chưa có nhóm thì chèn vào
          await function_granted
            .insertOneRecord({ ...jsonData, username })
            .catch((err) => {
              throw err;
            });
        } else {
          // dữ liệu có tìm thấy theo id, thực hiện update theo id
          await function_granted
            .updateOneRecord(jsonData, { username })
            .catch((err) => {
              throw err;
            });
        }

        req.finalJson = {
          status: "OK",
          message: `Đã bổ sung quyền ${privileges} ${model_name}/${table_name} cho user ${username} trong function_granted thành công`,
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
   * (25) POST /ccdc-tscd/user-tables/remove-table-2-user
   *
   * Thu hồi 1 quyền Table
   * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng username kiểm tra và xóa khỏi username quyền
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0123456789","privileges":"CRUD","model_name":"granted-users","table_name":"tables"}
   */
  removeTable2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let { username, privileges, model_name, table_name } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username || !privileges || !model_name || !table_name) {
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
      .getFirstRecord({ username }, { username: 1, table_models: 1 })
      .then(async (data) => {
        // tránh báo lỗi không có đối tượng
        if (!data || !data.username) {
          req.error = `Không tìm thấy user ${username} trong bảng function_granted`;
          next();
          return;
        }
        let tModel = await table_models
          .getFirstRecord({ model_name, table_name }, { id: 1 })
          .catch((error) => {
            throw error;
          });

        if (!tModel || !tModel.id) {
          req.error = `Không tìm thấy bảng ghi nào trong table_models theo ${model_name}/${table_name}`;
          next();
          return;
        }
        // tránh báo lỗi dịch định dạng không đúng
        let CRUDs = {};
        try {
          CRUDs =
            data && data.table_models ? JSON.parse(data.table_models) : {};
        } catch {
          CRUDs = {};
        }

        // có quyền
        // privileges , CRUD
        // CRUDs = {"C":[1,2,3,4,5,6,7,8], "R":[1,2,3,4,5,6,7,8], "U":[1,2,3,4,5,6,7,8], "D":[1,2,3,4,5,6,7,8]}

        // nếu người dùng truyền lên quyền khác CRUD thì bỏ đi, chỉ lấy trong CRUD thôi
        let uPs = privileges.split("");

        for (let key of uPs) {
          if (TABLE_PRIVILEGES.includes(key)) {
            if (CRUDs[key] && Array.isArray(CRUDs[key])) {
              let idx = CRUDs[key].findIndex((x) => x === tModel.id);
              if (idx > -1) CRUDs[key].splice(idx, 1);
            }
          }
        }
        // kết quả của CRUDs = {C:[...],R:[...],U:[...],D:[...]}
        // console.log("***> CRUDs thu hồi xong", CRUDs);

        let jsonData = {
          table_models: JSON.stringify(CRUDs),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        // dữ liệu có tìm thấy theo id, thực hiện update theo id
        await function_granted
          .updateOneRecord(jsonData, { username })
          .catch((err) => {
            throw err;
          });

        req.finalJson = {
          status: "OK",
          message: `Đã thu hồi quyền ${privileges} ${model_name}/${table_name} của user ${username} trong function_granted thành công`,
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
   * (26) POST /ccdc-tscd/user-tables/grant-table-root-2-user
   *
   * Gán quyền root table cho user
   * Select toàn bộ table bổ sung vào table_groups id =99 tất cả các quyền. Sau đó gán cho user ở trường table_groups
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0123456789"}
   */
  grantTableRoot2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    // thực hiện lấy các dữ liệu đầu vào tùy vào theo phương thức POST theo json_data hoặc form_data
    // hoặc có thể lấy theo phương thức tham số trên link sau dấu ? bằng req.paramS

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

    table_models
      .getAllData({ status: 1 }, { id: 1 })
      .then(async (tModels) => {
        let t99Ids = tModels.map((o) => o["id"]);
        // console.log("Tất cả các quyền bảng ",t99Ids);
        let CRUDs99 = {
          C: t99Ids,
          R: t99Ids,
          U: t99Ids,
          D: t99Ids,
        };
        let g99 = await table_groups
          .getFirstRecord({ id: 99 }, { id: 1, table_models: 1 })
          .catch((error) => {
            throw error;
          });

        let jsonData = {
          table_models: JSON.stringify(CRUDs99),
          updated_time: Date.now(),
          updated_user: req.user.username,
          status: 1,
        };

        // console.log("Tất cả các quyền bảng ",jsonData);

        if (!g99 || !g99.id) {
          await table_groups
            .insertOneRecord({
              id: 99,
              ...jsonData,
              name: "Nhóm 99 table giành cho DEV",
            })
            .catch((error) => {
              throw error;
            });
        } else {
          await table_groups
            .updateOneRecord({ ...jsonData }, { id: 99 })
            .catch((err) => {
              throw err;
            });
        }

        let tGroup = [];
        let jsonUser = {
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        let user = await function_granted
          .getFirstRecord({ username }, { username: 1, table_groups: 1 })
          .catch((err) => {
            throw err;
          });

        if (!user || !user.username) {
          tGroup = [99];
          await function_granted
            .insertOneRecord({
              username,
              ...jsonUser,
              table_groups: JSON.stringify(tGroup),
              status: 1, // mặt định cho hiệu lực của user
            })
            .catch((error) => {
              throw error;
            });
        } else {
          try {
            tGroup =
              user && user.table_groups ? JSON.parse(user.table_groups) : [];
          } catch {
            tGroup = [];
          }

          tGroup = [...new Set([...tGroup, ...[99]])];

          await function_granted
            .updateOneRecord(
              {
                ...jsonUser,
                table_groups: JSON.stringify(tGroup),
                status: 1, // mặt định cho hiệu lực của user
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
          message: `Bạn đã gán quyền TABLE root (99) ${JSON.stringify(
            tGroup
          )} cho user ${username}`,
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
   * (27) POST /ccdc-tscd/user-tables/revoke-table-root-2-user
   *
   * Thu hồi quyền root table của user
   * Thu hồi nhóm quyền root (tức là xóa nhóm 99 trong user ở nhóm table)
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  {"username":"0123456789"}
   */
  revokeTableRoot2User(req, res, next) {
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
      .getFirstRecord({ username }, { username: 1, table_groups: 1 })
      .then(async (user) => {
        if (!user || !user.username) {
          req.error = "User bạn muốn thu quyền không tồn tại";
          next();
          return;
        } else {
          let tGroup = [];
          try {
            tGroup =
              user && user.table_groups ? JSON.parse(user.table_groups) : [];
          } catch {
            tGroup = [];
          }

          let idx = tGroup.findIndex((x) => x === 99);
          if (idx > -1) tGroup.splice(idx, 1);

          await function_granted
            .updateOneRecord(
              {
                updated_time: Date.now(),
                updated_user: req.user.username,
                table_groups: JSON.stringify(tGroup),
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
          message: `Bạn đã thu hồi quyền TABLE root (99) của user ${username} thành công`,
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
   * (28) POST /ccdc-tscd/user-tables/grant-table-groups-2-user
   *
   * Gán các nhóm quyền tác động bảng đến user
   * Thực thi update quyền table_groups cho user [group_id…]
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  [{"username":"0123456789","table_groups":[99]}]
   */
  grantTableGroups2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }
    let { username, table_groups } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (!username || !table_groups || !Array.isArray(table_groups)) {
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
        { username: 1, table_groups: 1 } // jsonFields = list field to select field_1, field_2 from <table>
      )
      .then(async (user) => {
        let jsonData = {
          table_groups: JSON.stringify(table_groups),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!user || !user.username) {
          // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
          let sql = await function_granted
            .insertOneRecord({
              username,
              ...jsonData,
            })
            .catch((err) => {
              throw err;
            });
        } else {
          // dữ liệu có tìm thấy theo id, thực hiện update theo id
          let sql = await function_granted
            .updateOneRecord(jsonData, { username })
            .catch((err) => {
              throw err;
            });
        }
        // console.log('Data: ', data);
        req.finalJson = {
          status: "OK",
          message: `Đã phân nhóm quyền truy cập mô hình ${JSON.stringify(
            table_groups
          )} cho user ${username} thành công`,
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
   * (29) POST /ccdc-tscd/user-tables/grant-table-models-2-user
   *
   * Gán các quyền tác động đến bảng cho user
   * Thực thi update quyền table_models cho user {"C":[table_id,...],"R":[],"U":[],"D":[]}, tức phải liệt kê hết các quyền rồi tổ chức thêm vào
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  [{"username":"0123456789","table_models":{"C":[1,2],"R":[1,2],"U":[1,2],"D":[1,2]}}]
   */
  grantTableModels2User(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post json không hợp lệ";
      next();
      return;
    }

    let { username, table_models } = req.json_data;

    // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
    if (
      !username ||
      !table_models ||
      typeof table_models !== "object" ||
      !Object.keys(table_models).length
    ) {
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
        { username: 1, table_models: 1 } // jsonFields = list field to select field_1, field_2 from <table>
      )
      .then(async (user) => {
        let jsonData = {
          table_models: JSON.stringify(table_models),
          updated_time: Date.now(),
          updated_user: req.user.username,
        };

        if (!user || !user.username) {
          // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
          await function_granted
            .insertOneRecord({ username, ...jsonData })
            .catch((err) => {
              throw err;
            });
        } else {
          // dữ liệu có tìm thấy theo id, thực hiện update theo id
          await function_granted
            .updateOneRecord(jsonData, { username })
            .catch((err) => {
              throw err;
            });
        }
        // console.log('Data: ', data);
        req.finalJson = {
          status: "OK",
          message: `Đã cập nhập quyền truy cập Bảng cho user ${username} thành công`,
          data: table_models,
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
   * (30) GET /ccdc-tscd/user-tables/get-granted-table-4-user
   *
   * Lấy danh sách quyền tác động BẢNG của USER
   * Truy vấn bảng function_granted, join các chức năng lấy được các quyền { insert, select, update, delete} - CRUD
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:  ["username=0903500888" , "username=cuong.dq", "username=0123456789", "username=sy.vantien", "username=0901952666"]
   */
  getGrantedTable4User(req, res, next) {
    // có thể kiểm tra quyền của user đối với mô hình và bảng của mô hình
    let { username, model_name, table_name } = req.paramS;

    // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
    if (!req.user || !req.user.username) {
      req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
      next();
      return;
    }

    // lấy quyền của user chứa token truyền lên
    username = username || req.user.username;

    // ràng buộc kiểm tra dữ liệu yêu cầu
    if (!username) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }

    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    function_granted
      .getFirstRecord(
        { username }, // jsonWhere
        { username: 1, table_groups: 1, table_models: 1 } // jsonFields
      )
      // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
      .then(async (user) => {
        // các bảng được phân cho user
        // { C: [], R: [], U: [], D: [] }
        let granted_table = {};

        if (!user || !user.username) {
          req.finalJson = {
            username,
            granted_table,
          }; // không có quyền nào cả cho user này
          next();
          return;
        }

        // console.log("***>User", user);

        let tableGroups = [];
        try {
          let group =
            user && user.table_groups ? JSON.parse(user.table_groups) : [];
          tableGroups = Array.isArray(group) ? group : [];
        } catch {
          tableGroups = [];
        }

        // console.log("***>Table groupS:", tableGroups);

        // {C:[],R:[],U:[],D:[]}
        let tableCRUDs = { C: [], R: [], U: [], D: [] };
        try {
          let models =
            user && user.table_models ? JSON.parse(user.table_models) : {};
          if (typeof models === "object" && Object.keys(models).length) {
            for (let key in models) {
              let value = models[key];
              if (value && Array.isArray(value) && tableCRUDs[key]) {
                tableCRUDs[key] = [...new Set([...tableCRUDs[key], ...value])];
              }
            }
          }
        } catch {}

        // lấy toàn bộ nhóm quyền được phân
        let groupRows = await table_groups
          .getAllData({ id: { $in: tableGroups } }, { id: 1, table_models: 1 })
          .catch((error) => {
            throw error;
          });

        // console.log("***>Nhóm", username, groupRows);

        for (let tGroup of groupRows) {
          try {
            let models = tGroup.table_models
              ? JSON.parse(tGroup.table_models)
              : {};
            if (typeof models === "object" && Object.keys(models).length) {
              for (let key in models) {
                let value = models[key];
                if (value && Array.isArray(value) && tableCRUDs[key]) {
                  tableCRUDs[key] = [
                    ...new Set([...tableCRUDs[key], ...value]),
                  ];
                }
              }
            }
          } catch {}
        }

        // tất cả quyền của user
        // console.log("***>tableCRUDs: ", tableCRUDs);

        for (let key in tableCRUDs) {
          granted_table[key] = await table_models.getAllData({
            id: { $in: tableCRUDs[key] },
            model_name,
            table_name,
          });
        }
        req.finalJson = {
          username,
          granted_table,
        }; // không có quyền nào cả cho user này
        next();
      })
      .catch((err) => {
        // console.log('Lỗi: ', err);
        req.error = err;
        next();
      });
  }
}

module.exports = new UserTablesHandler();

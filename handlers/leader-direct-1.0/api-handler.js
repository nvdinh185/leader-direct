// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-05-31 15:44:25

"use strict";

// nối csdl thông qua mô hình
// const dbOrm = require("../../db/db-connection-pool-main");
// trả lại DAO của database nguyên gốc như cũ để sử dụng các lệnh
// const db = dbOrm.getDbInstance();

// hoặc sử dụng trực tiếp mô hình để giao tiếp csdl
// (nó hỗ trợ tự ràng buộc kiểu dữ liệu trước khi insert, update)
const leaderDirectModels = require("../../midlewares/leader-direct/models");

const fs = require("fs");
const path = require("path");

class ApiHandler {
  constructor() {}

  /**
   * Upload file lên và lưu thông tin file vào csdl
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async createAttachments(req, res, next) {
    const generateUUID = () => {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 = Math.random() * 1000;
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    };

    if (!req.form_data) {
      req.error = "Dữ liệu post req.form_data không hợp lệ";
      next();
      return;
    }

    req.ids = [];
    let arData = [];
    for (let file in req.form_data.files) {
      let jsonData = req.form_data.files[file];
      jsonData.uuid = generateUUID();
      req.ids.push(jsonData.uuid);
      arData.push(jsonData);
    }
    // console.log(arData);
    try {
      for (const data of arData) {
        await leaderDirectModels.attachments.insertOneRecord(data);
      }
      next();
    } catch (err) {
      req.error = err;
      next();
    }
  }

  /**
   * Upload file lên và lưu thông tin file vào csdl đồng thời xóa những file cũ
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async updateAttachments(req, res, next) {
    const generateUUID = () => {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 = Math.random() * 1000;
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    };

    if (!req.form_data) {
      req.error = "Dữ liệu post req.form_data không hợp lệ";
      next();
      return;
    }

    //lấy những file có trong db
    let attachments = await leaderDirectModels.meetings.getFirstRecord(
      { id: parseInt(req.form_data.params.id) },
      { attachments: 1 }
    );
    let str = attachments.attachments;
    let ar = str.slice(1, str.length - 1);
    let arAttachments = ar.split(",");
    // xóa những tên file cũ
    for (const id of arAttachments) {
      await leaderDirectModels.attachments.deleteOneRecord({ uuid: id });
    }

    req.ids = [];
    let arData = [];
    for (let file in req.form_data.files) {
      let jsonData = req.form_data.files[file];
      jsonData.uuid = generateUUID();
      req.ids.push(jsonData.uuid);
      arData.push(jsonData);
    }
    // console.log(arData);

    //lưu những tên file mới
    try {
      for (const data of arData) {
        await leaderDirectModels.attachments.insertOneRecord(data);
      }
      next();
    } catch (err) {
      req.error = err;
      next();
    }
  }

  /**
   * (101) POST /leader-direct/api/get-meeting
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getMeeting(req, res, next) {
    leaderDirectModels.meetings
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
   * (102) POST /leader-direct/api/create-meeting
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createMeeting(req, res, next) {
    let attachments = "[";
    req.ids.every((id, idx) => {
      attachments += id;
      if (idx === req.ids.length - 1) return false;
      attachments += ",";
      return true;
    });
    attachments += "]";
    let jsonData = {
      ...req.form_data.params,
      attachments: attachments,
      created_time: new Date().getTime(),
      created_user: req.user.username,
      status: 1,
    };
    // console.log(jsonData);

    leaderDirectModels.meetings
      .insertOneRecord(
        jsonData // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
      )
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log("Data: ", data);
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        // console.log("Lỗi: ", err);
        req.error = err;
        next();
      });
  }

  /**
   * (103) POST /leader-direct/api/update-meeting
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateMeeting(req, res, next) {
    let attachments = "[";
    req.ids.every((id, idx) => {
      attachments += id;
      if (idx === req.ids.length - 1) return false;
      attachments += ",";
      return true;
    });
    attachments += "]";

    let jsonData = {
      ...req.form_data.params,
      status: parseInt(req.form_data.params.status),
      attachments: attachments,
      updated_time: new Date().getTime(),
      updated_user: req.user.username,
    };
    jsonData.id = parseInt(jsonData.id);
    // update 1 bảng ghi vào csdl
    leaderDirectModels.meetings
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
   * (104) POST /leader-direct/api/get-direct
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirect(req, res, next) {
    leaderDirectModels.directs
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
   * (105) POST /leader-direct/api/get-direct-by-cat
   *
   * Lấy Direct theo Cat -> Truyền cat-id vào
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectByCat(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    leaderDirectModels.directs
      .getFirstRecord(
        { categories: jsonData.categories } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
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
   * (106) POST /leader-direct/api/create-direct
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createDirect(req, res, next) {
    // if (!req.form_data) {
    //     req.error = "Dữ liệu post req.form_data không hợp lệ";
    //     next();
    //     return;
    // }

    // thực hiện lấy các dữ liệu đầu vào tùy vào theo phương thức POST theo json_data hoặc form_data
    // hoặc có thể lấy theo phương thức tham số trên link sau dấu ? bằng req.paramS

    // let formData = req.form_data;
    // console.log(req.form_data.params);
    let jsonData = req.form_data.params;
    jsonData.attachments = "[ ";
    req.ids.every((id, idx) => {
      jsonData.attachments += id;
      if (idx === req.ids.length - 1) return false;
      jsonData.attachments += ", ";
      return true;
    });
    jsonData.attachments += " ]";
    jsonData.created_time = new Date().getTime();

    leaderDirectModels.directs
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
   * (107) POST /leader-direct/api/update-direct
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateDirect(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.updated_time = new Date().getTime();

    leaderDirectModels.directs
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
   * (108) POST /leader-direct/api/get-direct-org
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectOrg(req, res, next) {
    let jsonData = req.json_data;
    console.log(jsonData);
    leaderDirectModels.direct_orgs
      .getFirstRecord({ id: jsonData.id })
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
   * (109) POST /leader-direct/api/get-direct-by-org
   *
   * Lấy Chỉ Đạo Đơn Vị Theo Mã Đơn Vị (organization-id)
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectByOrg(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    // console.log(jsonData);

    leaderDirectModels.direct_orgs
      .getAllData({ organization_id: jsonData.organization_id })
      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        console.log("Data: ", data);
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
   * (110) POST /leader-direct/api/get-direct-org-all
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectOrgAll(req, res, next) {
    leaderDirectModels.direct_orgs
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
   * (111) POST /leader-direct/api/create-direct-org
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createDirectOrg(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.created_time = new Date().getTime();

    // chèn một bảng ghi vào csdl
    leaderDirectModels.direct_orgs
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
   * (112) POST /leader-direct/api/update-direct-org
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateDirectOrg(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.updated_time = new Date().getTime();

    leaderDirectModels.direct_orgs
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
   * (113) POST /leader-direct/api/get-direct-exe
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectExe(req, res, next) {
    leaderDirectModels.direct_executes
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
   * (114) POST /leader-direct/api/create-direct-exe
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createDirectExe(req, res, next) {
    if (!req.form_data) {
      req.error = "Dữ liệu post req.form_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.form_data.params;
    jsonData.attachments = "[ " + req.ids[0] + " ]";
    jsonData.created_time = new Date().getTime();
    console.log(jsonData);

    leaderDirectModels.direct_executes
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
   * (115) POST /leader-direct/api/update-direct-exe
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateDirectExe(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.updated_time = new Date().getTime();

    // update 1 bảng ghi vào csdl
    leaderDirectModels.direct_executes
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
   * (116) POST /leader-direct/api/get-category
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getCategory(req, res, next) {
    leaderDirectModels.categories
      .getAllData({}, {}, { id: 1 })

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
   * (117) POST /leader-direct/api/create-category
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createCategory(req, res, next) {
    console.log(req.json_data);
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, created_time: new Date().getTime(), status: 1 };

    // chèn một bảng ghi vào csdl
    leaderDirectModels.categories
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
   * (118) POST /leader-direct/api/update-category
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateCategory(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date().getTime(), updated_user: req.user.username };

    // update 1 bảng ghi vào csdl
    leaderDirectModels.categories
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
   * (119) POST /leader-direct/api/get-statuses
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getStatuses(req, res, next) {
    leaderDirectModels.statuses
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
   * (120) POST /leader-direct/api/get-status-by-cat-id
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getStatusByCatId(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
    leaderDirectModels.statuses
      .getFirstRecord(
        { cat_id: jsonData.cat_id } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
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
   * (121) POST /leader-direct/api/create-status
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createStatus(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.created_time = new Date().getTime();

    // chèn một bảng ghi vào csdl
    leaderDirectModels.statuses
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
   * (122) POST /leader-direct/api/update-status
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateStatus(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.updated_time = new Date().getTime();

    // update 1 bảng ghi vào csdl
    leaderDirectModels.statuses
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
   * (126) POST /leader-direct/api/get-menus
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getMenus(req, res, next) {
    leaderDirectModels.menus
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
   * (127) POST /leader-direct/api/create-menu
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createMenu(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.created_time = new Date().getTime();

    // chèn một bảng ghi vào csdl
    leaderDirectModels.menus
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
   * (128) POST /leader-direct/api/update-menu
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateMenu(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    jsonData.updated_time = new Date().getTime();

    // update 1 bảng ghi vào csdl
    leaderDirectModels.menus
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

module.exports = new ApiHandler();

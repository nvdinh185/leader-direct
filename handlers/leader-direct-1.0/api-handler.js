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
const querystring = require("querystring");
const fs = require("fs");
const mime = require("mime-types");
const path = require("path");

class ApiHandler {
  constructor() { }

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
      jsonData.created_time = new Date().getTime();
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

    req.ids = [];
    let arData = [];
    for (let file in req.form_data.files) {
      let jsonData = req.form_data.files[file];
      jsonData.uuid = generateUUID();
      req.ids.push(jsonData.uuid);
      jsonData.updated_time = new Date().getTime();
      arData.push(jsonData);
    }

    if (arData.length > 0) {
      //lấy những file có trong db
      let attachments = {};
      if (req.functionCode.includes("meeting")) {
        attachments = await leaderDirectModels.meetings.getFirstRecord(
          { id: parseInt(req.form_data.params.id) },
          { attachments: 1 }
        );
      } else if (req.functionCode.includes("direct")) {
        attachments = await leaderDirectModels.directs.getFirstRecord(
          { id: parseInt(req.form_data.params.id) },
          { attachments: 1 }
        );
      }

      let str = attachments.attachments;
      let ar = str.slice(1, str.length - 1);
      let arAttachments = ar.split(",");
      // xóa những tên file cũ
      for (const id of arAttachments) {
        await leaderDirectModels.attachments.deleteOneRecord({ uuid: id });
      }

      //lưu những tên file mới
      try {
        for (const data of arData) {
          await leaderDirectModels.attachments.insertOneRecord(data);
        }
      } catch (err) {
        req.error = err;
      } finally {
        next();
        return;
      }
    }

    next();
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
      updated_time: new Date().getTime(),
      updated_user: req.user.username,
      status: parseInt(req.form_data.params.status),
    };
    if (req.ids.length > 0) {
      jsonData.attachments = attachments;
    }
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
   * (104) POST /leader-direct/api/get-filter-direct
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getFilterDirect(req, res, next) {
    const formatTime = (milisecond) => {
      var date = new Date(milisecond);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;
    // console.log(jsonData);
    let jsonWhere = {};
    if (jsonData.from && jsonData.to) {
      let from = formatTime(jsonData.from);
      let to = formatTime(jsonData.to);
      jsonWhere.created_time = { $gte: from, $lte: to };
    }
    jsonData.cat ? jsonWhere.category = jsonData.cat : '';

    // console.log(jsonWhere);
    leaderDirectModels.directs
      .getAllData(jsonWhere)
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
   * (128) POST /leader-direct/api/get-direct-by-ids
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   */
  getDirectByIds(req, res, next) {
    if (!req.json_data.idArr) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonWhere = { id: { $in: req.json_data.idArr } }; //[1, 2];
    // console.log(jsonWhere);
    leaderDirectModels.directs
      .getAllData(jsonWhere)
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
      uuid: generateUUID(),
      attachments: attachments,
      created_time: new Date().getTime(),
      created_user: req.user.username,
      status: 1,
    };
    // console.log(jsonData);

    leaderDirectModels.directs
      .insertOneRecord(
        jsonData // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
      )
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then(async (data) => {
        let dataLoops = { direct_uuid: jsonData.uuid, created_time: new Date().getTime(), created_user: req.user.username };
        if (jsonData.executors) {
          let arExecutors = jsonData.executors.slice(1, jsonData.executors.length - 1).split(",");
          for (const exe of arExecutors) {
            let dataInput = { direct_uuid: jsonData.uuid, organization_id: parseInt(exe), organization_role: 22 };
            await leaderDirectModels.direct_orgs.insertOneRecord(dataInput);
          }
          dataLoops.executors = jsonData.executors;
        }

        if (jsonData.assessors) {
          let arAssessors = jsonData.assessors.slice(1, jsonData.assessors.length - 1).split(",");
          for (const ass of arAssessors) {
            let dataInput = { direct_uuid: jsonData.uuid, organization_id: parseInt(ass), organization_role: 21 };
            await leaderDirectModels.direct_orgs.insertOneRecord(dataInput);
          }
          dataLoops.assessors = jsonData.assessors;
        }

        // console.log(jsonData.category);
        if (jsonData.category) {
          if (jsonData.category === "31") {
            dataLoops.frequency = "W";
          } else if (jsonData.category === "32") {
            dataLoops.frequency = "M";
          } else if (jsonData.category === "33") {
            dataLoops.frequency = "Y";
          }
          // console.log(dataLoops);
          await leaderDirectModels.direct_loops.insertOneRecord(dataLoops);
        }

        req.finalJson = { uuid: jsonData.uuid };
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
    let attachments = "[";
    req.ids.every((id, idx) => {
      attachments += id;
      if (idx === req.ids.length - 1) return false;
      attachments += ",";
      return true;
    });
    attachments += "]";

    let jsonData = { ...req.form_data.params, updated_time: new Date().getTime(), updated_user: req.user.username };

    if (req.ids.length > 0) {
      jsonData.attachments = attachments;
    }
    jsonData.id = parseInt(jsonData.id);

    leaderDirectModels.directs
      .updateOneRecord(
        jsonData, // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        { id: jsonData.id } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
      )

      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then(async (data) => {
        // console.log('Data: ', data);
        let directUuid = await leaderDirectModels.directs.getFirstRecord({ id: jsonData.id }, { uuid: 1 });
        // console.log(directUuid);

        if (jsonData.executors) {
          let arExecutors = jsonData.executors.slice(1, jsonData.executors.length - 1).split(",");
          await leaderDirectModels.direct_orgs.deleteAll({ direct_uuid: directUuid.uuid, organization_role: 22 });
          for (const exe of arExecutors) {
            let dataInput = { direct_uuid: directUuid.uuid, organization_id: parseInt(exe), organization_role: 22 };
            await leaderDirectModels.direct_orgs.insertOneRecord(dataInput);
          }
        }

        if (jsonData.assessors) {
          let arAssessors = jsonData.assessors.slice(1, jsonData.assessors.length - 1).split(",");
          await leaderDirectModels.direct_orgs.deleteAll({ direct_uuid: directUuid.uuid, organization_role: 21 });
          for (const ass of arAssessors) {
            let dataInput = { direct_uuid: directUuid.uuid, organization_id: parseInt(ass), organization_role: 21 };
            await leaderDirectModels.direct_orgs.insertOneRecord(dataInput);
          }
        }
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
   * (120) GET /leader-direct/api/get-attachment-by-id
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getAttachmentById(req, res, next) {
    if (!req.paramS) {
      req.error = "Dữ liệu post req.paramS không hợp lệ";
      next();
      return;
    }

    let jsonData = req.paramS;
    // console.log(jsonData.id);

    leaderDirectModels.attachments
      .getFirstRecord({ uuid: jsonData.uuid })

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
   * (121) POST /leader-direct/api/get-attachment-by-ids
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getAttachmentByIds(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = req.json_data;

    let arIds = [];
    for (const uuid of jsonData) {
      arIds.push(uuid.uuid);
    }
    console.log(arIds);
    // console.log(arIds);

    let jsonWhere = { uuid: { $in: arIds } }; //["b21062f8-5048-4b4d-92e6-93a8d5aa240f", "76ff474c-8150-4c99-b67c-395782181bcb"] } };

    leaderDirectModels.attachments
      .getAllData(jsonWhere)

      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        // console.log('Data: ', data);
        console.log(data);
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
   * (122) POST /leader-direct/api/get-attachments
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getAttachments(req, res, next) {
    leaderDirectModels.attachments
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
   * (123) POST /leader-direct/api/create-menu
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
   * (124) POST /leader-direct/api/update-attachment
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

  /**
   * (125) POST /leader-direct/api/get-file
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getFile(req, res, next) {
    // lấy đường dẫn gốc để cắt tên file cân lấy
    // let params = req.url.substring("/get-file?url=".length);
    // let fileRead = decodeURIComponent(params.replace("/", path.sep));
    let fileRead = req.json_data.url;
    // let params1 = req.pathName.substring(req.pathName.indexOf("/get-file/") + 10); //'/site-manager/news/get-file/'.length);
    console.log(fileRead);

    //gioi han chi doc file tu duong dan upload_files thoi nhe
    if (fileRead.indexOf("upload_files") === 0) {
      let contentType = "image/jpeg";
      if (mime.lookup(fileRead)) contentType = mime.lookup(fileRead);
      console.log(contentType);
      fs.readFile(fileRead, { flag: "r" }, function (error, data) {
        console.log(error);
        if (!error) {
          // console.log("data: ", data);
          let buff = new Buffer(data);
          let base64data = buff.toString("base64");
          res.writeHead(200, { "Content-Type": contentType });
          res.end(base64data);
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("No file to read!");
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Not permit to read!");
    }
  }

  /**
   * (126) POST /leader-direct/api/get-direct-loops
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectLoops(req, res, next) {
    leaderDirectModels.direct_loops
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
   * (127) POST /leader-direct/api/update-direct-loop
   *
   *
   *
   *
   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateDirectLoop(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = { ...req.json_data, updated_time: new Date().getTime(), updated_user: req.user.username };

    // update 1 bảng ghi vào csdl
    leaderDirectModels.direct_loops
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

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
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const XlsxTemplate = require("xlsx-template");

const leaderDirectModels = require("../../midlewares/leader-direct/models");
const userightModels = require("../../midlewares/granted-users/models");
const dbOrigin = leaderDirectModels.meetings.getDb().getDbInstance().client.db("leader-direct-2021");

const { general, doHelper, daHelper, dxHelper, filterHelper, reportHelper } = require("./extds/index");
const { generateUUID } = require("./extds/createUpdate/GeneralHelper");
const { DO_DX_STT_MAP, DO_STATUS } = require("./extds/constants/index");

class ApiHandler {
  constructor() {
    this.createDirect = this.createDirect.bind(this);
    this.updateDirect = this.updateDirect.bind(this);
  }

  /**
   * Upload file lên và lưu thông tin file vào csdl
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async createAttachments(req, res, next) {
    if (!req.form_data) {
      req.error = "Dữ liệu post req.form_data không hợp lệ";
      next();
      return;
    }

    req.ids = [];
    let arData = [];
    for (let file in req.form_data.files) {
      let jsonData = req.form_data.files[file];
      jsonData.uuid = general.generateUUID();
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
    if (!req.form_data) {
      req.error = "Dữ liệu post req.form_data không hợp lệ";
      next();
      return;
    }

    req.ids = [];
    let arData = [];
    for (let file in req.form_data.files) {
      let jsonData = req.form_data.files[file];
      jsonData.uuid = general.generateUUID();
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
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getMeeting(req, res, next) {
    leaderDirectModels.meetings
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (101) POST /leader-direct/api/get-meeting
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getMeetingById(req, res, next) {
    if (!req.json_data.id) {
      req.error = "Không có dữ liệu meeting id theo yêu cầu";
      next();
      return;
    }
    leaderDirectModels.meetings
      .getFirstRecord({ id: req.json_data.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (102) POST /leader-direct/api/create-meeting
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      category: parseInt(req.form_data.params.category),
      status: 1,
    };
    console.log(jsonData);

    leaderDirectModels.meetings
      .insertOneRecord(jsonData)
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
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      category: parseInt(req.form_data.params.category),
      status: parseInt(req.form_data.params.status),
    };
    if (req.ids.length > 0) {
      jsonData.attachments = attachments;
    }
    jsonData.id = parseInt(jsonData.id);
    // update 1 bảng ghi vào csdl
    leaderDirectModels.meetings
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (104) POST /leader-direct/api/get-direct
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirect(req, res, next) {
    leaderDirectModels.directs
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (129) POST /leader-direct/api/get-filter-direct
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getFilterDirect(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    leaderDirectModels.directs
      .getAllData(jsonWhere)
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
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
      .getFirstRecord({ categories: jsonData.categories })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
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
    if (!req.json_data.uuidArr && !req.json_data.idArr) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonWhere = req.json_data.idArr
      ? { id: { $in: JSON.parse(req.json_data.idArr) } }
      : { uuid: { $in: JSON.parse(req.json_data.uuidArr) } };

    leaderDirectModels.directs
      .getAllData(jsonWhere)
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * Hàm update cho mảng directs ở meeting sau khi tạo direct xong
   * Hàm này ko đưa vào route
   */
  async updateMeetingDirect(req, res, next) {
    if (!req.json_data.meeting_id || !req.json_data.uuid) {
      req.error = "-- Không có dữ liệu theo yêu cầu ---";
      next();
      return;
    }
    let meetingData = await leaderDirectModels.meetings.getFirstRecord({ id: req.json_data.meeting_id });
    let directArr = [];
    // Nếu có field directs thì giá trị ban đầu là mảng này
    if (meetingData.directs) {
      directArr = JSON.parse(meetingData.directs);
    }
    directArr.push(req.json_data.uuid);
    leaderDirectModels.meetings
      .updateOneRecord(
        {
          ...meetingData,
          updated_time: new Date().getTime(),
          updated_user: req.user.username,
          directs: JSON.stringify(directArr),
        },
        { id: meetingData.id }
      )
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (106) POST /leader-direct/api/create-direct
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *  Logic hàm này là: (1) Tạo Direct -> (2) Lấy uuid của direct để tạo direct_orgs dựa vào assessors và executors
   *  -> (2') Đồng thời update mảng directs của meetings -> (2'') Insert direct_loops nếu loại chỉ đạo là lặp (31,32,33)
   * SAMPLE INPUTS:
   */
  createDirect(req, res, next) {
    // console.log(req.json_data);
    let jsonData = {
      ...req.json_data,
      uuid: general.generateUUID(),
      leader: parseInt(req.json_data.leader),
      created_time: new Date().getTime(),
      updated_time: new Date().getTime(),
      updated_user: req.user.username,
      created_user: req.user.username,
      status: 1,
    };
    console.log(req.json_data);

    leaderDirectModels.directs
      .insertOneRecord(jsonData)
      .then(async (data) => {
        // Sau khi insert vào directs thành công thì update direct_orgs theo assessors và executors
        let defaultDataLoops = {
          status: 1,
          meeting_id: jsonData.meeting_id,
          direct_uuid: jsonData.uuid,
          created_time: new Date().getTime(),
          created_user: req.user.username,
        };
        let defaultDataInput = {
          status: 1,
          description: jsonData.description,
          meeting_id: jsonData.meeting_id,
          direct_uuid: jsonData.uuid,
          created_time: new Date().getTime(),
          created_user: req.user.username,
        };
        if (jsonData.executors) {
          doHelper.createDirectOrgHelper(jsonData, defaultDataInput, jsonData.executors);
          defaultDataLoops.executors = jsonData.executors;
        }
        if (jsonData.assessors) {
          daHelper.createDirectAssHelper(jsonData, defaultDataInput, jsonData.assessors, jsonData.executors);
          defaultDataLoops.assessors = jsonData.assessors;
        }

        if ([31, 32, 33].includes(jsonData.category)) {
          if (jsonData.category === 31) {
            defaultDataLoops.frequency = "W";
          } else if (jsonData.category === 32) {
            defaultDataLoops.frequency = "M";
          } else if (jsonData.category === 33) {
            defaultDataLoops.frequency = "Y";
          }
          await leaderDirectModels.direct_loops.insertOneRecord(defaultDataLoops);
        }
        // Trả về uuid để thực hiện update meeting
        req.json_data = jsonData;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (107) POST /leader-direct/api/update-direct
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  async updateDirect(req, res, next) {
    let jsonData = { ...req.json_data, updated_time: new Date().getTime(), updated_user: req.user.username };
    let defaultDataInput = {
      status: 1,
      meeting_id: jsonData.meeting_id,
      direct_uuid: jsonData.uuid,
      created_time: new Date().getTime(),
      updated_time: new Date().getTime(),
      updated_user: req.user.username,
      created_user: req.user.username,
    };
    let oldDirect = await leaderDirectModels.directs.getFirstRecord({ uuid: jsonData.uuid });

    leaderDirectModels.directs
      .updateOneRecord(jsonData, { uuid: jsonData.uuid })
      .then(async (data) => {
        if (jsonData.executors) {
          doHelper.updateDirectOrgHelper(jsonData, defaultDataInput, oldDirect, jsonData.executors, jsonData.assessors);
        }
        if (jsonData.assessors) {
          daHelper.updateDirectAssHelper(jsonData, defaultDataInput, oldDirect, jsonData.executors);
        }
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (108) POST /leader-direct/api/get-direct-exe-by-dos
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  async getDirectExesByDOs(req, res, next) {
    if (!req.json_data && !req.json_data.uuidArr) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }
    try {
      let resultDXs = await leaderDirectModels.direct_executes.getAllData({ direct_org_uuid: { $in: req.json_data.uuidArr } });
      req.finalJson = resultDXs;
      next();
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
    }
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
    leaderDirectModels.direct_orgs
      .getAllData({ organization_id: jsonData.organization_id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (110) POST /leader-direct/api/get-direct-org-all
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectOrgAll(req, res, next) {
    leaderDirectModels.direct_orgs
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (111) POST /leader-direct/api/create-direct-org
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  createDirectOrg(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }

    let jsonData = {
      ...req.json_data,
      created_time: new Date().getTime(),
      updated_time: new Date().getTime(),
      created_user: req.user.username,
      updated_user: req.user.username,
      status: 1,
      exec_status: 11,
    };

    // chèn một bảng ghi vào csdl
    leaderDirectModels.direct_orgs
      .insertOneRecord({ ...jsonData })
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (112) POST /leader-direct/api/update-direct-org
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  updateDirectOrg(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonData = {
      ...req.json_data,
      updated_time: new Date().getTime(),
      updated_user: req.user.username,
    };

    leaderDirectModels.direct_orgs
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (113) POST /leader-direct/api/get-direct-exe
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectExe(req, res, next) {
    leaderDirectModels.direct_executes
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (114) POST /leader-direct/api/create-direct-exe
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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

    leaderDirectModels.direct_executes
      .insertOneRecord(jsonData)
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (115) POST /leader-direct/api/update-direct-exe
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (116) POST /leader-direct/api/get-category
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getCategory(req, res, next) {
    leaderDirectModels.categories
      .getAllData({}, {}, { id: 1 })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (117) POST /leader-direct/api/create-category
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .insertOneRecord(jsonData)
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (118) POST /leader-direct/api/update-category
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (120) GET /leader-direct/api/get-attachment-by-id
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (121) POST /leader-direct/api/get-attachment-by-ids
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
    // console.log(arIds);

    let jsonWhere = { uuid: { $in: arIds } }; //["b21062f8-5048-4b4d-92e6-93a8d5aa240f", "76ff474c-8150-4c99-b67c-395782181bcb"] } };

    leaderDirectModels.attachments
      .getAllData(jsonWhere)
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (122) POST /leader-direct/api/get-attachments
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getAttachments(req, res, next) {
    leaderDirectModels.attachments
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (123) POST /leader-direct/api/create-menu
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .insertOneRecord(jsonData)
      //  trả kết quả truy vấn cho api trực tiếp bằng cách sau
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (124) POST /leader-direct/api/update-menu
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (125) POST /leader-direct/api/get-file
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  getDirectLoops(req, res, next) {
    leaderDirectModels.direct_loops
      .getAllData()
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (127) POST /leader-direct/api/update-direct-loop
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
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
      .updateOneRecord(jsonData, { id: jsonData.id })
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  /**
   * (131) POST /leader-direct/api/update-direct-org-exec-status
   *  Post dữ liệu direct_org (uuid) lên kèm theo status (DO_STATUS) muốn thay đổi
   *  - Logic là update thông tin direct_org của exe trước -> tạo histories (dx)
   *  - Tiếp theo là update các direct_org có direct_uuid tương ứng và role là 21 theo bảng map stt tương ứng
   *
   * SAMPLE INPUTS: {uuid: 'asdfas-asdf1123', status: 51}
   */
  async updateDirectOrgExecStatus(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let uuidArr = req.json_data.update_arr.map((uuid) => uuid.uuid);
    // Lấy các bản ghi cũ của mảng uuid này trong db
    let oldDirectOrgArr = await leaderDirectModels.direct_orgs.getAllData({ uuid: { $in: uuidArr } });
    // Tạo ra đối tượng mới dựa trên các bản ghi cũ này
    try {
      // Tạo mới các dx trước để lấy ra mảng uuids dx
      let { insertUUIDs, resultUpdate, resultInsert } = await dxHelper.createOrUpdateDXOnDOChanged(req);
      // Tạo lên mảng đối tượng DO để update bảng direct_orgs
      let updateDOArr = oldDirectOrgArr.map((oldDO) => {
        let newDO = req.json_data.update_arr.find((item) => item.uuid === oldDO.uuid);
        let newDXUUIDs = insertUUIDs.filter((insertUUID) => insertUUID.doUUID === oldDO.uuid).map((item) => item.dxUUID);
        let newHistories = [...JSON.parse(oldDO.histories), ...newDXUUIDs];
        return {
          ...oldDO,
          ...newDO,
          description: oldDO.description,
          histories: JSON.stringify(newHistories),
          exec_status: parseInt(newDO.exec_status),
          updated_time: new Date().getTime(),
          updated_user: req.user.username,
        };
      });
      // ---------------------------------------------------------------------------------
      // Khi sự kiện update direct org xảy ra thì tạo thêm bản ghi vào direct_executes đồng thời có logic tạo bản ghi mới
      // ở bên direct_assessments để báo cho đơn vị đánh giá cập nhập thông tin
      let result = await leaderDirectModels.direct_orgs.updateRows(updateDOArr, { uuid: { $in: uuidArr } });

      // TODO: Code đổi trạng thái bản ghi ở direct_assessments (Hoàn thành %, Hoàn thành, Xin gia hạn)
      let searchDUuidinDA = oldDirectOrgArr.map((dio) => dio.direct_uuid);
      let searchDOrginDA = oldDirectOrgArr.map((dio) => dio.organization_id);
      let foundDAs = await leaderDirectModels.direct_assessments.getAllData({
        direct_uuid: { $in: searchDUuidinDA },
        organization_exe: { $in: searchDOrginDA },
      });
      console.log(foundDAs);
      let newDAs = foundDAs.map((da) => {
        // Tìm thằng này trong updateArr gởi lên được cập nhập trạng thái là bao nhiêu
        let foundExe = req.json_data.update_arr.find(
          (exe) => exe.direct_uuid === da.direct_uuid && exe.organization_id === da.organization_exe
        );
        return {
          ...da,
          exec_status: DO_DX_STT_MAP[foundExe.exec_status].DO_ASS,
          status: 1,
        };
      });
      // Cập nhập trạng thái dass theo do mới
      let daResult = leaderDirectModels.direct_assessments.updateRows(newDAs, {
        direct_uuid: { $in: searchDUuidinDA },
        organization_exe: { $in: searchDOrginDA },
      });

      req.finalJson = { result, resultDx: { resultUpdate, resultInsert }, resultDA: daResult };
      next();
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
    }
  }

  /**
   * (132) POST /leader-direct/api/get-filter-direct-org
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: {
    "created_time": {"from": 1626189072000, "to": 1626354152767},
    "exec_status": [11,12],
    "organization_id": [5],
    "organization_role": [21,22]
    }
   * 
   */
  async getFilterDirectOrg(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    try {
      let dOResult = await leaderDirectModels.direct_orgs.getAllData(jsonWhere);
      let directResult;
      if (dOResult) {
        let dUuids = [...new Set(dOResult.map((dio) => dio.direct_uuid))];
        directResult = await leaderDirectModels.directs.getAllData({ uuid: { $in: dUuids } });
      }
      req.finalJson = { directOrgs: dOResult, directs: directResult };
      next();
    } catch (err) {
      req.error = err;
      next();
    }
  }

  /**
   * (133) POST /leader-direct/api/get-filter-meeting
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: {
    "created_time": {"from": 1626189072000, "to": 1626354152767},
    "exec_status": [11,12],
    "organization_id": [5],
    "organization_role": [21,22]
    }
   * 
   */
  getFilterMeeting(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    leaderDirectModels.meetings
      .getAllData(jsonWhere)
      .then((data) => {
        req.finalJson = data;
        next();
      })
      .catch((err) => {
        req.error = err;
        next();
      });
  }

  // ---------------------------------------------------------------------------------
  // SECTION 2: NHÓM HÀM PHỤC VỤ THỐNG KÊ BÁO CÁO
  // ---------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------
  async testModelDAO(req, res, next) {
    let collName = await dbOrigin.collection("meetings").find({}).toArray();
    console.log(collName);
    req.finalJson = collName;
    next();
  }

  /**
   * (134) POST /leader-direct/api/get-count-data-by-criteria
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: 
    {
    "model": "direct_orgs",
    "jsonWhere": {"organization_role": 22}
    }
   * 
   */
  async getCountDataByCriteria(req, res, next) {
    if (!req.json_data.model || !req.json_data.jsonWhere) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }
    let { model, jsonWhere } = req.json_data;
    try {
      let data = await leaderDirectModels[model].getCount(jsonWhere);
      req.finalJson = data;
      next();
    } catch (error) {
      console.log(error);
      req.error = error;
      next();
    }
  }

  /**
   * (134) POST /leader-direct/api/get-filter-data-dynamic
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: 
    {
    "model": "directs",
    "jsonWhere": {
        "category": [35],
        "meeting_id": [1]
    }
   * 
   */
  async getFilterDataDynamic(req, res, next) {
    if (!req.json_data.model || !req.json_data.jsonWhere) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }
    let { model, jsonWhere } = req.json_data;
    let jsonWhereNew = filterHelper.filterCriteriaBuilder(jsonWhere, ...Object.keys(jsonWhere));
    console.log(jsonWhereNew);
    try {
      let data = await leaderDirectModels[model].getAllData(jsonWhereNew);
      console.log(data);
      req.finalJson = data;
      next();
    } catch (error) {
      console.log(error);
      req.error = error;
      next();
    }
  }

  /**
   * (136) POST /leader-direct/api/get-filter-direct-ass
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: {
    "created_time": {"from": 1626189072000, "to": 1626354152767},
    "exec_status": [11,12],
    "organization_id": [5],
    "organization_role": [21,22]
    }
   * 
   */
  async getFilterDirectAss(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    try {
      let dAResult = await leaderDirectModels.direct_assessments.getAllData(jsonWhere);
      let directResult;
      if (dAResult) {
        let dUuids = [...new Set(dAResult.map((dia) => dia.direct_uuid))];
        console.log(dUuids);
        directResult = await leaderDirectModels.directs.getAllData({ uuid: { $in: dUuids } });
      }
      req.finalJson = { directAsses: dAResult, directs: directResult };
      next();
    } catch (err) {
      req.error = err;
      next();
    }
  }
  /**
   * (137) POST /leader-direct/api/update-direct-criteria
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: 
   * {
    "direct_uuid": "94676e20-15fe-489f-bb1a-53209c76eb32",
    "assess_criteria": [
        {
            "organization": {"id": 3, "name": "P.TH"},
            "created_time": "01/08/2021",
            "due_date": "10/08/2021",
            "description": "Test nhập criteria cho direct"
        }
      ]
    }
   * 
   */
  async updateDirectCriteria(req, res, next) {
    if (!req.json_data && !req.json_data.direct_uuid) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let oldDirect = await leaderDirectModels.directs.getFirstRecord({ uuid: req.json_data.direct_uuid });
    req.json_data.assess_criteria.sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());
    let directDueDate = null;
    if (req.json_data.assess_criteria && req.json_data.assess_criteria.length > 0) {
      directDueDate = req.json_data.assess_criteria[0].due_date;
      directDueDate = new Date(directDueDate).getTime();
    }
    // Kiểm tra nếu trong assess_criteria có đủ assessors thì đổi status thành 2
    try {
      let dAssesorArr = JSON.parse(oldDirect.assessors);
      let dAssCritArr = req.json_data.assess_criteria.map((crit) => crit.organization.id);
      let isComplete = true;

      dAssesorArr.forEach((assessor) => {
        if (dAssCritArr.includes(assessor)) {
          return;
        }
        isComplete = false;
      });

      let newDirect = {
        ...oldDirect,
        updated_time: new Date().getTime(),
        due_date: directDueDate,
        assess_criteria: JSON.stringify(req.json_data.assess_criteria),
        status: isComplete ? 2 : 1,
      };
      leaderDirectModels.directs
        .updateOneRecord(newDirect, { uuid: req.json_data.direct_uuid })
        .then((data) => {
          req.finalJson = data;
          next();
        })
        .catch((err) => {
          req.error = err;
          next();
        });
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
    }
  }
  /**
   * (138) POST /leader-direct/api/update-direct-assessment-logs
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: 
   * {
    "direct_uuid": "94676e20-15fe-489f-bb1a-53209c76eb32",
    "assess_criteria": [
        {
            "organization": {"id": 3, "name": "P.TH"},
            "created_time": "01/08/2021",
            "due_date": "10/08/2021",
            "description": "Test nhập criteria cho direct"
        }
      ]
    }
   * 
   */
  async updateDirectAssessmentLogs(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    console.log("CALL IN UPDATE ASSS LOGS --", req.json_data);
    // TODO: (1) Nếu ko có truyền lên log_uuid thì gọi hàm tạo mới
    let result;
    if (!req.json_data.log_uuid) {
      leaderDirectModels.direct_assess_logs
        .insertOneRecord({
          ...req.json_data,
          created_time: new Date().getTime(),
          created_user: req.user.username,
          uuid: generateUUID(),
        })
        .then(async (data) => {
          let oldAss = await leaderDirectModels.direct_assessments.getFirstRecord({ uuid: req.json_data.direct_ass_uuid });
          result = await leaderDirectModels.direct_assessments.updateOneRecord(
            {
              ...oldAss,
              updated_user: req.user.username,
              updated_time: new Date().getTime(),
              exec_status: DO_STATUS.ASS_COMPLETE,
            },
            { uuid: oldAss.uuid }
          );
          req.finalJson = { directAssLog: data, directAss: result };
          next();
        })
        .catch((err) => {
          console.log(err);
          req.error = err;
          next();
        });
      return;
    }
    // TODO: (2) Nếu có log_uuid truyền lên thì gọi hàm update
    // Khi update lại thông tin thì ko cần thay đổi gì trạng thái của dass cả
    try {
      let oldDassLog = await leaderDirectModels.direct_assess_logs.getFirstRecord({ uuid: req.json_data.log_uuid });
      result = await leaderDirectModels.direct_assess_logs.updateOneRecord(
        { ...oldDassLog, ...req.json_data, updated_user: req.user.username, updated_time: new Date().getTime() },
        { uuid: oldDassLog.uuid }
      );
      req.finalJson = result;
      next();
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
    }
  }

  /**
   * (139) POST /leader-direct/api/get-filter-direct-exe
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   *
   * SAMPLE INPUTS:
   */
  async getFilterDirectExe(req, res, next) {
    if (!req.json_data) {
      req.error = "Không có dữ liệu theo yêu cầu";
      next();
      return;
    }
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    try {
      let resultDXs = await leaderDirectModels.direct_executes.getAllData(jsonWhere);
      req.finalJson = resultDXs;
      next();
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
    }
  }
  /**
   * (136) POST /leader-direct/api/get-filter-direct-ass-logs
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: {
    "created_time": {"from": 1626189072000, "to": 1626354152767},
    "exec_status": [11,12],
    "organization_id": [5],
    "organization_role": [21,22]
    }
   * 
   */
  async getFilterDirectAssLogs(req, res, next) {
    if (!req.json_data) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    try {
      let directResult = await leaderDirectModels.direct_assess_logs.getAllData(jsonWhere);
      req.finalJson = directResult;
      next();
    } catch (err) {
      req.error = err;
      next();
    }
  }
  /**
   * (136) POST /leader-direct/api/get-report-direct-agg-excel
   *   * - Yêu cầu ĐƯỢC PHÂN QUYỀN
   * 
   * SAMPLE INPUTS: {
    "created_time": {"from": 1626189072000, "to": 1626354152767},
    }
   * 
   */
  async getReportDirectAggExcel(req, res, next) {
    if (!req.json_data && !req.json_data.organizations) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let { from, to } = req.json_data.created_time;
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    try {
      // TODO: (1) Lấy tất cả dữ liệu directs và direct exe
      let organizationArr = await userightModels.organizations.getAllData({});
      let directOrgArr = await leaderDirectModels.direct_orgs.getAllData({ created_time: jsonWhere.created_time });

      // TODO: (2) Filter lại dữ liệu theo org truyền lên (khác -1 tức là lọc theo đơn vị)
      if (!req.json_data.organizations.includes(-1)) {
        organizationArr = organizationArr.filter((org) => req.json_data.organizations.includes(org.id));
      }
      let rpResult = reportHelper.filterDataForReportAgg(organizationArr, directOrgArr, req.json_data);

      let values = {
        reportDate: new Date(),
        from: general.convertDateToDDMMYYY(new Date(from)),
        to: general.convertDateToDDMMYYY(new Date(to)),
        aggReports: rpResult,
      };
      // TODO: (2) Trường hợp excel true thì xuất excel (ngược lại thì trả về dữ liệu rpResult)
      if (req.json_data.isExcelExport === true) {
        fs.readFile(path.join("excel-templates", "bao-cao-tong-hop.xlsx"), function (err, data) {
          var template = new XlsxTemplate(data);
          var sheetNumber = 1;
          template.substitute(sheetNumber, values);
          // Chuyển file binary sang dạng base64
          var data = template.generate({ type: "base64" });
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); // mime type
          res.setHeader("Content-Disposition", "attachment; filename=bao-cao-tong-hop.xlsx");
          res.send(data);
        });
        return;
      }
      req.finalJson = rpResult;
      next();
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
    }
  }

  /**
   *
   */
  async getReportDirectDetailExcel(req, res, next) {
    if (!req.json_data && !req.json_data.organizations) {
      req.error = "Dữ liệu post req.json_data không hợp lệ";
      next();
      return;
    }
    let { from, to } = req.json_data.created_time;
    let jsonWhere = filterHelper.filterCriteriaBuilder(req.json_data, ...Object.keys(req.json_data));
    try {
      // TODO: Lấy các dữ liệu về meeting, directs, direct exe trong khoảng thời gian truyền lên
      let categoryArr = await leaderDirectModels.categories.getAllData({});
      let organizationArr = await userightModels.organizations.getAllData({});
      let meetingRes = await leaderDirectModels.meetings.getAllData({ created_time: jsonWhere.created_time });
      let directRes = await leaderDirectModels.directs.getAllData({ created_time: jsonWhere.created_time });
      let directOrgRes = await leaderDirectModels.direct_orgs.getAllData({ created_time: jsonWhere.created_time });
      let directExeRes = await leaderDirectModels.direct_executes.getAllData({ created_time: jsonWhere.created_time });

      let rpDetailRes = reportHelper.filterDataForReportDetail(
        categoryArr,
        organizationArr,
        meetingRes,
        directRes,
        directOrgRes,
        directExeRes,
        req.json_data
      );

      // TODO: Tạo display cho 2 trường filter theo lãnh đạo và tiến độ
      let displayLeaderFilterStr = "";
      let displayExeStatusFilterStr = "";
      if (!req.json_data.leaders.includes(-1)) {
        let displayLeaderFilter = categoryArr.filter((cat) => req.json_data.leaders.includes(cat.id));
        displayLeaderFilter = displayLeaderFilter.map((dLead) => dLead.name);
        displayLeaderFilterStr = displayLeaderFilter.concat(", ");
      }
      if (!req.json_data.statuses.includes(-1)) {
        let displayExeStatusFilter = categoryArr.filter((cat) => req.json_data.statuses.includes(cat.id));
        displayExeStatusFilter = displayExeStatusFilter.map((dStt) => dStt.name);
        displayExeStatusFilterStr = displayExeStatusFilter.concat(", ");
      }
      console.log(displayLeaderFilterStr);
      let values = {
        reportDate: new Date(),
        from: general.convertDateToDDMMYYY(new Date(from)),
        to: general.convertDateToDDMMYYY(new Date(to)),
        leaderFilter: displayLeaderFilterStr,
        execStatusFilter: displayExeStatusFilterStr,
        detailReports: rpDetailRes,
      };

      if (req.json_data.isExcelExport === true) {
        fs.readFile(path.join("excel-templates", "bao-cao-chi-tiet.xlsx"), function (err, data) {
          var template = new XlsxTemplate(data);
          var sheetNumber = 1;
          template.substitute(sheetNumber, values);
          // Chuyển file binary sang dạng base64
          var data = template.generate({ type: "base64" });
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); // mime type
          res.setHeader("Content-Disposition", "attachment; filename=bao-cao-chi-tiet.xlsx");
          res.send(data);
        });
        return;
      }
      req.finalJson = rpDetailRes;
      next();
    } catch (err) {
      console.log(err);
      req.error = err;
      next();
      return;
    }
  }
}

module.exports = new ApiHandler();

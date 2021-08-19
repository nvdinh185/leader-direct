const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID } = require("./GeneralHelper");
const { DO_STATUS, ORG_ROLE } = require("../constants/index");

// ---------------------------------------------------------------------------------
// 0 - CREATE UPDATE DIRECT ASSESSMENTS

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} jsonData
 * @param {*} defaultDataInput
 * @param {*} orgIdArrStr Mảng chứa các id của đơn vị (assessor hay executor)
 * @param {*} mode Mode để chạy hàm này (assessors hay executors) -> Số nhiều
 */
function createDirectAssHelper(jsonData, defaultDataInput, orgIdArrStr, executerArrStr) {
  let directOrgMode = "assessors";
  if (orgIdArrStr && defaultDataInput && jsonData) {
    let orgIdArrStr = jsonData[directOrgMode].slice(1, jsonData[directOrgMode].length - 1).split(",");
    orgIdArrStr.forEach((ass) => {
      let doUUID = generateUUID();
      try {
        let defaultInput = {
          direct_uuid: jsonData.uuid,
          direct_org_uuid: doUUID,
          organization_id: parseInt(ass),
          organization_role: ORG_ROLE.ASSESSOR,
          created_user: defaultDataInput.created_user,
          category: DO_STATUS.ASS_UP_CRIT,
          description: "P.TH tạo mới chỉ đạo",
        };
        // Tạo mới cho bảng direct_executes trước để lấy uuid bỏ vào direct_orgs
        createInitDirectAssHelper(defaultInput, executerArrStr);
      } catch (err) {
        console.log(err);
      }
    });
  }
}

// ---------------------------------------------------------------------------------
// 0 - CREATE AND UPDATE DIRECT ORG WITH UUID
// ---------------------------------------------------------------------------------

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} dataInput Build datainput gồm các field: direct_org_uuid, org_id, org_role, cat, status, created_user
 */
const createInitDirectAssHelper = async (dataInput, executerArrStr) => {
  if (dataInput) {
    let dataToInsert = {
      ...dataInput,
      exec_status: DO_STATUS.ASS_UP_CRIT,
      created_time: new Date().getTime(),
      status: 1,
    };
    try {
      // TODO: Tạo các bản ghi đánh giá thực hiện theo từng đơn vị
      let exeArr = JSON.parse(executerArrStr);
      for (const exeId of exeArr) {
        // Tìm xem đã có bản ghi này trong cơ sở dữ liệu
        let dAssNewCreated = await leaderDirectModels.direct_assessments.getFirstRecord({
          direct_uuid: dataInput.direct_uuid,
          organization_id: dataInput.organization_id,
          organization_exe: exeId,
          status: 1,
        });
        if (!dAssNewCreated) {
          let uuid = generateUUID();
          await leaderDirectModels.direct_assessments.insertOneRecord({
            ...dataToInsert,
            uuid: uuid,
            organization_exe: exeId,
            exec_status: DO_STATUS.ASS_EXE,
          });
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }
};

// ---------------------------------------------------------------------------------
// 1. UPDATE

/**
 * Hàm update direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} jsonData
 * @param {*} defaultDataInput
 * @param {*} directOrgMode Mode chạy cái này (assessor hay executor)
 * @param {*} oldDirect Đối tượng direct cũ để so sánh
 */
async function updateDirectAssHelper(jsonData, defaultDataInput, oldDirect, executerArrStr) {
  let dAssMode = "assessors";
  // Logic để lấy ra mảng giá trị giống và khác so với phiên bản cũ
  let oldDAssArr = JSON.parse(oldDirect[dAssMode]);
  let newDAssArr = JSON.parse(jsonData[dAssMode]);
  let newDAssToInsert = newDAssArr.filter((newOrg) => !oldDAssArr.includes(newOrg));
  let oldDAssToInsert = oldDAssArr.filter((oldOrg) => !newDAssArr.includes(oldOrg));
  // Nếu có dữ liệu cần thêm vào thì chạy code này
  if (newDAssToInsert && newDAssToInsert.length > 0) {
    updaateDAssCreateNew(newDAssToInsert, jsonData, defaultDataInput, executerArrStr);
  }
  // Nếu có dữ liệu cần xoá thì chạy code này (không xoá hẳn, chỉ chuyển status)
  if (oldDAssToInsert && oldDAssToInsert.length > 0) {
    updateDAssUpdateOld(oldDAssToInsert, jsonData, defaultDataInput);
  }
}

const updaateDAssCreateNew = (newDOrgToInsert, jsonData, defaultDataInput, executerArrStr) => {
  newDOrgToInsert.forEach(async (org) => {
    // ---------------------------------------------------------------------------------
    // Kiểm tra đã có dữ liệu này trạng thái 0 trong csdl chưa (có rồi thì đổi status lại là 1)
    let oldDAssArr = await leaderDirectModels.direct_assessments.getAllData({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      status: 0,
    });

    if (oldDAssArr && oldDAssArr.length > 0) {
      // TODO: STEP 1: Đổi status cho bản ghi cũ có giá trị 0
      let dAssUUIDArr = oldDAssArr.map((dass) => dass.uuid);
      let newDAssArrToUpdate = oldDAssArr.map((dass) => ({
        ...dass,
        status: 1,
        updated_time: new Date().getTime(),
        updated_user: defaultDataInput.updated_user,
      }));
      await leaderDirectModels.direct_assessments.updateRows(newDAssArrToUpdate, { uuid: { $in: dAssUUIDArr } });
    }
    // ---------------------------------------------------------------------------------
    // Chưa có thì insert thêm bản ghi mới trong direct_assessments
    let doUUID = generateUUID();
    try {
      let defautData = {
        direct_uuid: jsonData.uuid,
        direct_org_uuid: doUUID,
        organization_id: parseInt(org),
        created_user: defaultDataInput.created_user,
        description: "P.TH tạo mới chỉ đạo",
      };
      createInitDirectAssHelper(defautData, executerArrStr);
    } catch (error) {
      console.log(error);
    }
  });
};

const updateDAssUpdateOld = (oldDAssToUpdate, jsonData, defaultDataInput) => {
  oldDAssToUpdate.forEach(async (org) => {
    let oldDAssArr = await leaderDirectModels.direct_assessments.getAllData({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      status: 1,
    });
    try {
      let dAssUUIDArr = oldDAssArr.map((dass) => dass.uuid);
      let oldDAssArrToUpdate = oldDAssArr.map((dass) => ({
        ...dass,
        status: 0,
        updated_time: new Date().getTime(),
        updated_user: defaultDataInput.updated_user,
      }));
      await leaderDirectModels.direct_assessments.updateRows(oldDAssArrToUpdate, { uuid: { $in: dAssUUIDArr } });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { createDirectAssHelper, createInitDirectAssHelper, updateDirectAssHelper };

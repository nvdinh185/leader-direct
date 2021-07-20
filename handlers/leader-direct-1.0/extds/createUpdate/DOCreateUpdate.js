const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID, ORG_ROLE, DX_STATUS, ASS_TYPES, DO_STATUS } = require("./GeneralHelper");
const { createInitDirectExeHelper } = require("./DXCreateUpdate");
const { createInitDirectAssHelper } = require("./DACreateUpate");

// ---------------------------------------------------------------------------------
// 0 - CREATE AND UPDATE DIRECT ORG WITH UUID
// ---------------------------------------------------------------------------------

const modeBaseFunction = {
  createInitFunc: {
    executors: createInitDirectExeHelper,
    assessors: createInitDirectAssHelper,
  },
};

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} jsonData
 * @param {*} defaultDataInput
 * @param {*} orgIdArrStr Mảng chứa các id của đơn vị (assessor hay executor)
 * @param {*} mode Mode để chạy hàm này (assessors hay executors) -> Số nhiều
 */
function createDirectOrgHelper(jsonData, defaultDataInput, orgIdArrStr, directOrgMode = "executors", executerArrStr) {
  if (orgIdArrStr && defaultDataInput && jsonData) {
    let orgIdArrStr = jsonData[directOrgMode].slice(1, jsonData[directOrgMode].length - 1).split(",");
    orgIdArrStr.forEach((exe) => {
      let doUUID = generateUUID();
      try {
        let defaultInput = {
          direct_uuid: jsonData.uuid,
          direct_org_uuid: doUUID,
          organization_id: parseInt(exe),
          organization_role: directOrgMode === "executors" ? ORG_ROLE.EXECUTOR : ORG_ROLE.ASSESSOR,
          created_user: defaultDataInput.created_user,
          category: directOrgMode === "executors" ? DX_STATUS.CREATE_DIRECT : ASS_TYPES.UPDATE_CRIT,
          description: "P.TH tạo mới chỉ đạo",
        };
        // Tạo mới cho bảng direct_executes trước để lấy uuid bỏ vào direct_orgs
        modeBaseFunction.createInitFunc[directOrgMode](defaultInput, executerArrStr).then(async (result) => {
          // Tạo mới trong bảng direct_orgs với uuid direct_executes tạo mới
          await leaderDirectModels.direct_orgs.insertOneRecord({
            ...defaultDataInput,
            uuid: doUUID,
            histories: JSON.stringify([...result.dxUUID]),
            exec_status: directOrgMode === "executors" ? DO_STATUS.NEW : DO_STATUS.ASS_UP_CRIT,
            organization_id: parseInt(exe),
            organization_role: directOrgMode === "executors" ? ORG_ROLE.EXECUTOR : ORG_ROLE.ASSESSOR,
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} jsonData
 * @param {*} defaultDataInput
 * @param {*} directOrgMode Mode chạy cái này (assessor hay executor)
 * @param {*} oldDirect Đối tượng direct cũ để so sánh
 */
async function updateDirectOrgHelper(jsonData, defaultDataInput, directOrgMode = "executors", oldDirect, executerArrStr) {
  // Logic để lấy ra mảng giá trị giống và khác so với phiên bản cũ
  let oldDOrgArr = JSON.parse(oldDirect[directOrgMode]);
  let newDOrgsArr = JSON.parse(jsonData[directOrgMode]);
  let newDOrgToInsert = newDOrgsArr.filter((newOrg) => !oldDOrgArr.includes(newOrg));
  let oldDOrgToUpdate = oldDOrgArr.filter((oldOrg) => !newDOrgsArr.includes(oldOrg));
  // Đầu tiên update desc cho tất cả bản ghi trước rồi mới chạy từng điều kiện
  updateDOInfoOnly(jsonData, defaultDataInput)
    .then(() => {
      // Nếu có dữ liệu cần thêm vào thì chạy code này
      if (newDOrgToInsert && newDOrgToInsert.length > 0) {
        updateDOCreateNew(newDOrgToInsert, jsonData, defaultDataInput, directOrgMode, executerArrStr);
      }
      // Nếu có dữ liệu cần xoá thì chạy code này (không xoá hẳn, chỉ chuyển status)
      if (oldDOrgToUpdate && oldDOrgToUpdate.length > 0) {
        updateDOUpdateOld(oldDOrgToUpdate, jsonData, defaultDataInput, directOrgMode);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateDOInfoOnly(jsonData, defaultDataInput) {
  // Lấy các direct_orgs rồi update thông tin desc mới vào
  return new Promise(async (res, rej) => {
    let dOrgArr = await leaderDirectModels.direct_orgs.getAllData({ direct_uuid: jsonData.uuid });
    if (dOrgArr && dOrgArr.length > 0) {
      dOrgArr.forEach(async (dOrg) => {
        try {
          await leaderDirectModels.direct_orgs.updateOneRecord(
            {
              ...dOrg,
              description: jsonData.description,
              updated_time: new Date().getTime(),
              updated_user: defaultDataInput.updated_user,
            },
            { uuid: dOrg.uuid }
          );
        } catch (err) {
          rej();
          console.log(err);
        }
      });
      res();
    }
  });
}

const updateDOCreateNew = (newDOrgToInsert, jsonData, defaultDataInput, directOrgMode, executerArrStr) => {
  newDOrgToInsert.forEach(async (org) => {
    //--------------------------------
    // Kiểm tra đã có dữ liệu này trạng thái 0 trong csdl chưa (có rồi thì đổi status lại là 1)
    let oldDirectOrg = await leaderDirectModels.direct_orgs.getFirstRecord({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      organization_role: directOrgMode === "assessors" ? ORG_ROLE.ASSESSOR : ORG_ROLE.EXECUTOR,
      status: 0,
    });

    if (oldDirectOrg && Object.keys(oldDirectOrg).length > 0) {
      await leaderDirectModels.direct_orgs.updateOneRecord(
        {
          ...oldDirectOrg,
          description: jsonData.description,
          status: 1,
          updated_time: new Date().getTime(),
          updated_user: defaultDataInput.updated_user,
        },
        { uuid: oldDirectOrg.uuid }
      );
      //--------------------------------
      return;
    }
    // Chưa có thì insert thêm bản ghi mới đồng thời insert thêm cho bảng direct_executes
    let doUUID = generateUUID();
    try {
      let defautData = {
        direct_uuid: jsonData.uuid,
        direct_org_uuid: doUUID,
        organization_id: parseInt(org),
        organization_role: directOrgMode === "executors" ? ORG_ROLE.EXECUTOR : ORG_ROLE.ASSESSOR,
        created_user: defaultDataInput.created_user,
        category: directOrgMode === "executors" ? DX_STATUS.CREATE_DIRECT : ASS_TYPES.UPDATE_CRIT,
        description: "P.TH tạo mới chỉ đạo",
      };
      modeBaseFunction.createInitFunc[directOrgMode](defautData, executerArrStr).then(async (result) => {
        await leaderDirectModels.direct_orgs.insertOneRecord({
          ...defaultDataInput,
          uuid: doUUID,
          description: jsonData.description,
          histories: JSON.stringify([...result.dxUUID]),
          exec_status: directOrgMode === "executors" ? DO_STATUS.NEW : DO_STATUS.ASS_UP_CRIT,
          direct_uuid: jsonData.uuid,
          organization_id: parseInt(org),
          organization_role: directOrgMode === "executors" ? ORG_ROLE.EXECUTOR : ORG_ROLE.ASSESSOR,
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const updateDOUpdateOld = (oldDOrgToUpdate, jsonData, defaultDataInput, directOrgMode) => {
  oldDOrgToUpdate.forEach(async (org) => {
    let oldDirectOrg = await leaderDirectModels.direct_orgs.getFirstRecord({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      organization_role: directOrgMode === "assessors" ? ORG_ROLE.ASSESSOR : ORG_ROLE.EXECUTOR,
      status: 1,
    });

    try {
      await leaderDirectModels.direct_orgs.updateOneRecord(
        {
          ...oldDirectOrg,
          description: jsonData.description,
          status: 0,
          updated_time: new Date().getTime(),
          updated_user: defaultDataInput.updated_user,
        },
        {
          uuid: oldDirectOrg.uuid,
        }
      );
      // Đồng thời chuyển trạng thái bản ghi trong direct assessment có liên quan nếu là thằng assessor
      if (directOrgMode === "assessors") {
        // Lấy các bản ghi có direct_org_id bằng ở trên
        let directAssessArr = await leaderDirectModels.direct_assessments.getAllData({ direct_org_uuid: oldDirectOrg.uuid });
        // Update trạng thái cho nó về 0
        let uuidArrToUpdate = directAssessArr.map((dass) => dass.uuid);
        let updateDAssArr = directAssessArr.map((dass) => ({ ...dass, status: 0 }));
        await leaderDirectModels.direct_assessments.updateRows(updateDAssArr, { uuid: uuidArrToUpdate });
      }
      // Đồng thời chuyển trạng thái bản ghi trong direct executors có liên quan nếu là thằng executors
      if (directOrgMode === "executors") {
        // Lấy các bản ghi có direct_org_id bằng ở trên
        let directExeArr = await leaderDirectModels.direct_executes.getAllData({ direct_org_uuid: oldDirectOrg.uuid });
        // Update trạng thái cho nó về 0
        let uuidArrToUpdate = directExeArr.map((dexe) => dexe.uuid);
        let updateDExeArr = directExeArr.map((dexe) => ({ ...dexe, status: 0 }));
        await leaderDirectModels.direct_executes.updateRows(updateDExeArr, { uuid: uuidArrToUpdate });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { createDirectOrgHelper, updateDirectOrgHelper };

const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID } = require("./GeneralHelper");
const { ORG_ROLE, DX_STATUS, ASS_TYPES, DO_STATUS } = require("../constants/index");
const { createInitDirectExeHelper } = require("./DXCreateUpdate");
const { createInitDirectAssHelper, createDirectAssHelper } = require("./DACreateUpate");

// ---------------------------------------------------------------------------------
// 0 - CREATE AND UPDATE DIRECT ORG WITH UUID
// ---------------------------------------------------------------------------------

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} jsonData
 * @param {*} defaultDataInput
 * @param {*} orgIdArrStr Mảng chứa các id của đơn vị (assessor hay executor)
 * @param {*} mode Mode để chạy hàm này (assessors hay executors) -> Số nhiều
 */
function createDirectOrgHelper(jsonData, defaultDataInput, orgIdArrStr, executerArrStr) {
  let directOrgMode = "executors";
  if (orgIdArrStr && defaultDataInput && jsonData) {
    let orgIdArrStr = jsonData[directOrgMode].slice(1, jsonData[directOrgMode].length - 1).split(",");
    orgIdArrStr.forEach((exe) => {
      let doUUID = generateUUID();
      try {
        let defaultInput = {
          direct_uuid: jsonData.uuid,
          direct_org_uuid: doUUID,
          organization_id: parseInt(exe),
          organization_role: ORG_ROLE.EXECUTOR,
          created_user: defaultDataInput.created_user,
          category: DX_STATUS.CREATE_DIRECT,
          description: "P.TH tạo mới chỉ đạo",
        };
        // Tạo mới cho bảng direct_executes trước để lấy uuid bỏ vào direct_orgs
        createInitDirectExeHelper(defaultInput, executerArrStr).then(async (result) => {
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
 * Hàm update direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} jsonData
 * @param {*} defaultDataInput
 * @param {*} directOrgMode Mode chạy cái này (assessor hay executor)
 * @param {*} oldDirect Đối tượng direct cũ để so sánh
 */
async function updateDirectOrgHelper(jsonData, defaultDataInput, oldDirect, executerArrStr, assessorArrStr) {
  let directOrgMode = "executors";
  // Logic để lấy ra mảng giá trị giống và khác so với phiên bản cũ
  let oldDOrgArr = JSON.parse(oldDirect[directOrgMode]);
  let newDOrgsArr = JSON.parse(jsonData[directOrgMode]);
  let newDOrgToInsert = newDOrgsArr.filter((newOrg) => !oldDOrgArr.includes(newOrg));
  let oldDOrgToUpdate = oldDOrgArr.filter((oldOrg) => !newDOrgsArr.includes(oldOrg));
  // Nếu có dữ liệu cần thêm vào thì chạy code này
  if (newDOrgToInsert && newDOrgToInsert.length > 0) {
    updateDOCreateNew(newDOrgToInsert, jsonData, defaultDataInput, directOrgMode, executerArrStr, assessorArrStr);
  }
  // Nếu có dữ liệu cần xoá thì chạy code này (không xoá hẳn, chỉ chuyển status)
  if (oldDOrgToUpdate && oldDOrgToUpdate.length > 0) {
    updateDOUpdateOld(oldDOrgToUpdate, jsonData, defaultDataInput, directOrgMode);
  }
}

const updateDOCreateNew = (newDOrgToInsert, jsonData, defaultDataInput, directOrgMode, executerArrStr, assessorArrStr) => {
  newDOrgToInsert.forEach(async (org) => {
    // ---------------------------------------------------------------------------------
    //--------------------------------
    // Kiểm tra đã có dữ liệu này trạng thái 0 trong csdl chưa (có rồi thì đổi status lại là 1)
    let oldDirectOrg = await leaderDirectModels.direct_orgs.getFirstRecord({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      organization_role: directOrgMode === "assessors" ? ORG_ROLE.ASSESSOR : ORG_ROLE.EXECUTOR,
      status: 0,
    });

    if (oldDirectOrg && Object.keys(oldDirectOrg).length > 0) {
      // TODO: STEP 1: Đổi status cho bản ghi cũ có giá trị 0
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
      // TODO: Đồng thời đổi status ở tất cả direct assessments của thằng DO này thành 1
      let jsonWhere = {
        direct_uuid: oldDirectOrg.direct_uuid,
        organization_exe: oldDirectOrg.organization_id,
      };
      let dAssToUpDateArr = await leaderDirectModels.direct_assessments.getAllData(jsonWhere);
      let newDassToUpdateArr = dAssToUpDateArr.map((dass) => ({
        ...dass,
        status: 1,
        updated_time: new Date(),
        updated_user: defaultDataInput.created_user,
      }));
      let uuiToUpdateArr = dAssToUpDateArr.map((dass) => dass.uuid);
      await leaderDirectModels.direct_assessments.updateRows(newDassToUpdateArr, { uuid: { $in: uuiToUpdateArr } });
    }
    // ---------------------------------------------------------------------------------
    // Chưa có thì insert thêm bản ghi mới đồng thời insert thêm cho bảng direct_executes & thằng direct_assessments
    let doUUID = generateUUID();
    try {
      let defautData = {
        direct_uuid: jsonData.uuid,
        direct_org_uuid: doUUID,
        organization_id: parseInt(org),
        organization_role: ORG_ROLE.EXECUTOR,
        created_user: defaultDataInput.created_user,
        category: DX_STATUS.CREATE_DIRECT,
        description: "P.TH tạo mới chỉ đạo",
      };
      createInitDirectExeHelper(defautData).then(async (result) => {
        await leaderDirectModels.direct_orgs.insertOneRecord({
          ...defaultDataInput,
          uuid: doUUID,
          histories: JSON.stringify([...result.dxUUID]),
          exec_status: DO_STATUS.NEW,
          direct_uuid: jsonData.uuid,
          organization_id: parseInt(org),
          organization_role: ORG_ROLE.EXECUTOR,
        });
      });
      // TODO: Hiện thêm mới 1 DO exe nhưng chưa thêm mới bên D Ass
      let dAssArr = JSON.parse(assessorArrStr);
      dAssArr.forEach(async (dass) => {
        let dAssDefaultData = {
          direct_uuid: jsonData.uuid,
          direct_org_uuid: doUUID,
          organization_id: parseInt(dass),
          organization_role: ORG_ROLE.ASSESSOR,
          created_user: defaultDataInput.created_user,
          description: "P.TH tạo mới chỉ đạo",
        };
        await createInitDirectAssHelper(dAssDefaultData, executerArrStr);
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
      // Đồng thời chuyển trạng thái bản ghi trong direct executors có liên quan nếu là thằng executors
      // 1. Chuyển trạng thái của mấy thằng direct_org có liên quan
      // Lấy các bản ghi có direct_org_id bằng ở trên
      let directExeArr = await leaderDirectModels.direct_executes.getAllData({ direct_org_uuid: oldDirectOrg.uuid });
      // Update trạng thái cho nó về 0
      let uuidArrToUpdate = directExeArr.map((dexe) => dexe.uuid);
      let updateDExeArr = directExeArr.map((dexe) => ({ ...dexe, status: 0 }));
      await leaderDirectModels.direct_executes.updateRows(updateDExeArr, { uuid: uuidArrToUpdate });

      // TODO: Chuyển các bản ghi của direct_assessments có liên quan tới các thằng direct_org này
      // 2. Cập nhập direct_assessments theo các uuid có org_exe giống doOld
      let jsonWhereAss = {
        direct_uuid: oldDirectOrg.direct_uuid,
        organization_exe: oldDirectOrg.organization_id,
        status: 1,
      };
      console.log("DEBUG jsonwWHere ------------------------------------------------------------- \n", jsonWhereAss);
      let directAssesArr = await leaderDirectModels.direct_assessments.getAllData(jsonWhereAss);
      let uuidDassArrUpdate = directAssesArr.map((dass) => dass.uuid);
      let updateDAssArr = directAssesArr.map((dass) => ({ ...dass, status: 0 }));
      await leaderDirectModels.direct_assessments.updateRows(updateDAssArr, { uuid: uuidDassArrUpdate });
    } catch (error) {
      console.log(error);
    }
  });
};

// ---------------------------------------------------------------------------------
// TODO: Ở logic trên khi update direct org thì histories của direct ass đang chưa thay đổi

module.exports = { createDirectOrgHelper, updateDirectOrgHelper };

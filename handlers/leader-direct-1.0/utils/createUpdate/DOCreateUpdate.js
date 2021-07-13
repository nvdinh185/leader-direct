const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID } = require("./GeneralHelper");
const { createDirectExeHelper } = require("./DXCreateUpdate");

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
function createDirectOrgHelper(jsonData, defaultDataInput, orgIdArrStr, directOrgMode = "executors") {
  if (orgIdArrStr && defaultDataInput && jsonData) {
    let doUUID = generateUUID();
    let orgIdArrStr = jsonData[directOrgMode].slice(1, jsonData[directOrgMode].length - 1).split(",");
    orgIdArrStr.forEach((exe) => {
      try {
        // Tạo mới cho bảng direct_executes trước để lấy uuid bỏ vào direct_orgs
        createDirectExeHelper({
          direct_uuid: jsonData.uuid,
          direct_org_uuid: doUUID,
          organization_id: parseInt(exe),
          organization_role: directOrgMode === "executors" ? 22 : 21,
          created_user: defaultDataInput.created_user,
        }).then(async (result) => {
          // Tạo mới trong bảng direct_orgs với uuid direct_executes tạo mới
          await leaderDirectModels.direct_orgs.insertOneRecord({
            uuid: doUUID,
            ...defaultDataInput,
            histories: JSON.stringify([result.dxUUID]),
            exec_status: 11,
            organization_id: parseInt(exe),
            organization_role: directOrgMode === "executors" ? 22 : 21,
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
async function updateDirectOrgHelper(jsonData, defaultDataInput, directOrgMode = "executors", oldDirect) {
  // Logic để lấy ra mảng giá trị giống và khác so với phiên bản cũ
  let oldDOrgArr = JSON.parse(oldDirect[directOrgMode]);
  let newDOrgsArr = JSON.parse(jsonData[directOrgMode]);
  let newDOrgToInsert = newDOrgsArr.filter((newOrg) => !oldDOrgArr.includes(newOrg));
  let oldDOrgToUpdate = oldDOrgArr.filter((oldOrg) => !newDOrgsArr.includes(oldOrg));
  // Nếu có dữ liệu cần thêm vào thì chạy code này
  if (newDOrgToInsert && newDOrgToInsert.length > 0) {
    updateDOCreateNew(newDOrgToInsert, jsonData, defaultDataInput, directOrgMode);
  }
  // Nếu có dữ liệu cần xoá thì chạy code này (không xoá hẳn, chỉ chuyển status)
  if (oldDOrgToUpdate && oldDOrgToUpdate.length > 0) {
    updateDOUpdateOld(oldDOrgToUpdate, jsonData, defaultDataInput);
  }
  // Nếu nằm ngoài 2 trường hợp trên tức update thông tin description từ jsonData thì gọi hàm này
  if ((!oldDOrgToUpdate || oldDOrgToUpdate.length === 0) && (!newDOrgToInsert || newDOrgToInsert.length === 0)) {
    updateDOInfoOnly(jsonData, defaultDataInput);
  }
}

async function updateDOInfoOnly(jsonData, defaultDataInput) {
  // Lấy các direct_orgs rồi update thông tin
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
        console.log(err);
      }
    });
  }
}

const updateDOCreateNew = (newDOrgToInsert, jsonData, defaultDataInput, directOrgMode) => {
  newDOrgToInsert.forEach(async (org) => {
    //--------------------------------
    // Kiểm tra đã có dữ liệu này trạng thái 0 trong csdl chưa (có rồi thì đổi status lại là 1)
    let oldDirectOrg = await leaderDirectModels.direct_orgs.getFirstRecord({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
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
        { direct_uuid: jsonData.uuid, organization_id: parseInt(org) }
      );
      //--------------------------------
      return;
    }
    // Chưa có thì insert thêm bản ghi mới
    // Đồng thời insert thêm cho bảng direct_executes
    //--------------------------------
    let doUUID = generateUUID();
    try {
      createDirectExeHelper({
        direct_uuid: jsonData.uuid,
        direct_org_uuid: doUUID,
        organization_id: parseInt(org),
        organization_role: directOrgMode === "executors" ? 22 : 21,
        created_user: defaultDataInput.created_user,
      }).then(async (result) => {
        await leaderDirectModels.direct_orgs.insertOneRecord({
          uuid: doUUID,
          ...defaultDataInput,
          description: jsonData.description,
          histories: JSON.stringify([result.dxUUID]),
          exec_status: 11,
          direct_uuid: jsonData.uuid,
          organization_id: parseInt(org),
          organization_role: directOrgMode === "executors" ? 22 : 21,
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const updateDOUpdateOld = (oldDOrgToUpdate, jsonData, defaultDataInput) => {
  oldDOrgToUpdate.forEach(async (org) => {
    let oldDirectOrg = await leaderDirectModels.direct_orgs.getFirstRecord({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
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
        { direct_uuid: jsonData.uuid, organization_id: parseInt(org) }
      );
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { createDirectOrgHelper, updateDirectOrgHelper };

const leaderDirectModels = require("../../../midlewares/leader-direct/models");

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
async function createDirectOrgHelper(jsonData, defaultDataInput, orgIdArrStr, directOrgMode = "executors") {
  console.log(jsonData);
  if (orgIdArrStr && defaultDataInput && jsonData) {
    let orgIdArrStr = jsonData[directOrgMode].slice(1, jsonData[directOrgMode].length - 1).split(",");
    orgIdArrStr.forEach(async (exe) => {
      await leaderDirectModels.direct_orgs.insertOneRecord({
        ...defaultDataInput,
        exect_status: 11,
        organization_id: parseInt(exe),
        organization_role: directOrgMode === "executors" ? 22 : 21,
      });
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
  console.log("------------------------------------------------------------- ", newDOrgToInsert, oldDOrgToUpdate);
  if (newDOrgToInsert?.[0]) {
    updateDOCreateNew(newDOrgToInsert, jsonData, defaultDataInput, directOrgMode);
  }
  // Nếu có dữ liệu cần xoá thì chạy code này (không xoá hẳn, chỉ chuyển status)
  if (oldDOrgToUpdate?.[0]) {
    updateDOUpdateOld(oldDOrgToUpdate, jsonData, defaultDataInput);
  }
}

const updateDOCreateNew = (newDOrgToInsert, jsonData, defaultDataInput, directOrgMode) => {
  newDOrgToInsert.forEach(async (org) => {
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
          status: 1,
          updated_time: new Date().getTime(),
          updated_user: defaultDataInput.updated_user,
        },
        { direct_uuid: jsonData.uuid, organization_id: parseInt(org) }
      );
      return;
    }
    // Chưa có thì insert thêm bản ghi mới
    await leaderDirectModels.direct_orgs.insertOneRecord({
      ...defaultDataInput,
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      organization_role: directOrgMode === "executors" ? 22 : 21,
    });
  });
};

const updateDOUpdateOld = (oldDOrgToUpdate, jsonData, defaultDataInput) => {
  oldDOrgToUpdate.forEach(async (org) => {
    let oldDirectOrg = await leaderDirectModels.direct_orgs.getFirstRecord({
      direct_uuid: jsonData.uuid,
      organization_id: parseInt(org),
      status: 1,
    });
    console.log("------------------------------------------------------------- ", jsonData);
    await leaderDirectModels.direct_orgs.updateOneRecord(
      {
        ...oldDirectOrg,
        status: 0,
        updated_time: new Date().getTime(),
        updated_user: defaultDataInput.updated_user,
      },
      { direct_uuid: jsonData.uuid, organization_id: parseInt(org) }
    );
  });
};

module.exports = { createDirectOrgHelper, updateDirectOrgHelper };

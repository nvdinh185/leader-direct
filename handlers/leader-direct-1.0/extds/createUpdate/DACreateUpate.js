const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID, DO_DX_STT_MAP, ASS_TYPES } = require("./GeneralHelper");

// ---------------------------------------------------------------------------------
// 0 - CREATE AND UPDATE DIRECT ORG WITH UUID
// ---------------------------------------------------------------------------------

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} dataInput Build datainput gồm các field: direct_org_uuid, org_id, org_role, cat, status, created_user
 */
const createInitDirectAssHelper = (dataInput, executerArrStr) => {
  return new Promise(async (resolve, reject) => {
    if (dataInput) {
      let dxUUIDArr = [];
      let dataToInsert = {
        ...dataInput,
        created_time: new Date().getTime(),
        status: 1,
      };
      try {
        // Tạo 1 bản ghi thêm mới
        let dxUUID = generateUUID();
        let result = await leaderDirectModels.direct_assessments.insertOneRecord({ ...dataToInsert, uuid: dxUUID });
        // Tạo các bản ghi đánh giá thực hiện ban đầu
        let exeArr = JSON.parse(executerArrStr);
        for (const exeId of exeArr) {
          let uuid = generateUUID();
          await leaderDirectModels.direct_assessments.insertOneRecord({
            ...dataToInsert,
            uuid: uuid,
            organization_exe: exeId,
            category: ASS_TYPES.ASS_EXE,
          });
          dxUUIDArr.push(uuid);
        }
        resolve({ dxUUID: dxUUIDArr, result });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
};

const createOneInitDirectAssHelper = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    if (dataInput) {
      let dataToInsert = {
        ...dataInput,
        created_time: new Date().getTime(),
        status: 1,
      };
      try {
        // Tạo 1 bản ghi thêm mới
        let dxUUID = generateUUID();
        let result = await leaderDirectModels.direct_assessments.insertOneRecord({ ...dataToInsert, uuid: dxUUID });

        resolve({ dxUUID: [dxUUID], result });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
};

module.exports = { createInitDirectAssHelper };

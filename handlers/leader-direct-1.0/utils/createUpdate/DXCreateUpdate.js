const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID } = require("./GeneralHelper");

const EXE_TYPES = {
  CREATE_DIRECT: 51,
  UPDATE_EXE_STATUS: 52,
  UPDATE_CMPLT_PRCT: 53,
  UPDATE_CMPLT: 54,
  REQ_EXT1: 55,
};

const ASS_TYPES = {
  UPDATE_CRIT: 61,
  ACCEPT_EXT1: 62,
  ASS_EXE: 63,
  ASS_EXE_CMPLT: 64,
  UPDATE_LEADER_OPINION: 65,
};

// ---------------------------------------------------------------------------------
// 0 - CREATE AND UPDATE DIRECT ORG WITH UUID
// ---------------------------------------------------------------------------------

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} dataInput Build datainput gồm các field: direct_org_uuid, org_id, org_role, cat, status, created_user
 */
function createDirectExeHelper(dataInput) {
  return new Promise(async (resolve, reject) => {
    if (dataInput) {
      let dxUUID = generateUUID();
      let dataToInsert = {
        uuid: dxUUID,
        ...dataInput,
        category: EXE_TYPES.CREATE_DIRECT,
        created_time: new Date().getTime(),
        status: 1,
      };
      try {
        let result = await leaderDirectModels.direct_executes.insertOneRecord(dataToInsert);
        resolve({ dxUUID, result });
      } catch (err) {
        reject(err);
        console.log(err);
      }
    }
  });
}

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} dataInput Build datainput gồm các field: direct_org_uuid, org_id, org_role, cat, status, created_user
 */
// async function updateDirectExeHelper({ directOrgUuid, status, updated_user }) {
//   // Đầu tiên lấy các bản ghi của thằng direct_org đó ra đã
//   console.log("DEBUG ------------------------------------------------------------- \n", directOrgUuid);
//   let dxArr = await leaderDirectModels.direct_executes.getAllData({ direct_org_uuid: directOrgUuid, status: !status });

//   // Sau đó duyệt qua từng phần tử rồi cập nhập trạng thái cho nó theo trạng thái truyền vào
//   if (dxArr) {
//     dxArr.forEach(async (dx) => {
//       // console.log("DEBUG ------------------------------------------------------------- \n", dx);
//       try {
//         await leaderDirectModels.direct_executes.updateOneRecord(
//           {
//             ...dx,
//             status: status,
//             updated_time: new Date().getTime(),
//             updated_user: updated_user,
//           },
//           { uuid: dx.uuid }
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   }
// }

module.exports = { createDirectExeHelper };

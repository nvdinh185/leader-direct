const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID, DO_DX_STT_MAP } = require("./GeneralHelper");

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
        ...dataInput,
        uuid: dxUUID,
        created_time: new Date().getTime(),
        status: 1,
      };
      try {
        let result = await leaderDirectModels.direct_executes.insertOneRecord(dataToInsert);
        resolve({ dxUUID, result });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
}

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {[object]} req mảng chứa thông tin cần update của direct org [{uuid: '123dsfas', exec_status: 12}]
 */
function createOrUpdateDXOnDOChanged(req) {
  return new Promise(async (resolve, reject) => {
    const { insertUUIDs, updateInfoArr, insertNewArr } = await returnDXAddOrUpdateArr(req);
    let resultInsert = "";
    let resultUpdate = "";
    try {
      if (updateInfoArr && updateInfoArr.length > 0) {
        let uuidUpdates = updateInfoArr.map((item) => item.uuid);
        resultUpdate = await leaderDirectModels.direct_executes.updateRows(updateInfoArr, { uuid: { $in: uuidUpdates } });
      }
      if (insertNewArr && insertNewArr.length > 0) {
        resultInsert = await leaderDirectModels.direct_executes.importRows(insertNewArr);
      }
      resolve({ insertUUIDs, resultUpdate, resultInsert });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

function returnDXAddOrUpdateArr(req) {
  // Step 1: Tìm các bản ghi directOrgEx đã có giá trị exec_status này rồi tách ra làm 2 case -> create new & update info only
  return new Promise(async (res, rej) => {
    let uuidArr = req.json_data.update_arr.map((item) => item.uuid);
    let oldDXArr = await leaderDirectModels.direct_executes.getAllData({ direct_org_uuid: { $in: uuidArr } });
    let genUUIDs = [];
    // So sánh status cũ với mới và tách ra 2 object
    let dXAddOrUpdateArr = req.json_data.update_arr.reduce(
      (agg, item) => {
        const reqDxCat = DO_DX_STT_MAP[item.exec_status].DX;
        const oldUuidDx = oldDXArr.find((old) => old.direct_org_uuid === item.uuid && old.category === reqDxCat);
        // Nếu tìm ra uuidDx thì update
        if (oldUuidDx) {
          return {
            ...agg,
            updateInfoArr: [...agg.updateInfoArr, { ...oldUuidDx, description: item.description, category: reqDxCat }],
          };
        }
        // Nếu khác thì thêm mới DX vào
        // Lấy 1 đối tượng có direct org tương đương ở oldDXArr để có thông tin của nó
        let sampleOldDXArr = oldDXArr.find((old) => old.direct_org_uuid === item.uuid);
        let newUUID = generateUUID();
        genUUIDs.push({ doUUID: item.uuid, dxUUID: newUUID });
        return {
          ...agg,
          insertNewArr: [
            ...agg.insertNewArr,
            {
              ...sampleOldDXArr,
              uuid: newUUID,
              description: item.description,
              category: reqDxCat,
              created_time: new Date().getTime(),
              created_user: req.user.username,
              status: 1,
            },
          ],
        };
      },
      { updateInfoArr: [], insertNewArr: [] }
    );
    res({ ...dXAddOrUpdateArr, insertUUIDs: genUUIDs });
  });
}

module.exports = { createDirectExeHelper, createOrUpdateDXOnDOChanged };

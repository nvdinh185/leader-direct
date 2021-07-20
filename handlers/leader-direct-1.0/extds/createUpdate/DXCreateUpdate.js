const leaderDirectModels = require("../../../../midlewares/leader-direct/models");
const { generateUUID, DO_DX_STT_MAP, DO_STATUS } = require("./GeneralHelper");

// ---------------------------------------------------------------------------------
// 0 - CREATE AND UPDATE DIRECT ORG WITH UUID
// ---------------------------------------------------------------------------------
/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {*} dataInput Build datainput gồm các field: direct_org_uuid, org_id, org_role, cat, status, created_user
 */
const createInitDirectExeHelper = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    if (dataInput) {
      let dxUUID = generateUUID();
      let dataToInsert = {
        ...dataInput,
        uuid: dxUUID,
        update_no: 1,
        created_time: new Date().getTime(),
        status: 1,
      };
      try {
        let result = await leaderDirectModels.direct_executes.insertOneRecord(dataToInsert);
        resolve({ dxUUID: [dxUUID], result });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
};

/**
 * Hàm tạo direct_org theo các giá trị truyền vào (để rút gọn bớt mấy cái hàm lặp lại)
 * @param {[object]} req mảng chứa thông tin cần update của direct org [{uuid: '123dsfas', exec_status: 12}]
 */
const createOrUpdateDXOnDOChanged = (req) => {
  return new Promise(async (resolve, reject) => {
    const { insertUUIDs, updateInfoArr, insertNewArr } = await returnDXAddOrUpdateArr(req);
    let resultInsert = "";
    let resultUpdate = "";
    try {
      if (updateInfoArr && updateInfoArr.length > 0) {
        let uuidUpdates = updateInfoArr.map((item) => item.uuid);
        // Trường hợp update thì ko quan tâm vì logic là khi thêm mới dx thì dass mới thay đổi category
        resultUpdate = await leaderDirectModels.direct_executes.updateRows(updateInfoArr, { uuid: { $in: uuidUpdates } });
      }
      if (insertNewArr && insertNewArr.length > 0) {
        resultInsert = await leaderDirectModels.direct_executes.importRows(insertNewArr);
        // Logic để cập nhập lại category (status) của dass khi có sự thay đổi dx
        // Có 3 case: update lại dass khi dx thay đổi (hoàn thành %, hoàn thành, gia hạn)
      }
      resolve({ insertUUIDs, resultUpdate, resultInsert });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const returnDXAddOrUpdateArr = (req) => {
  // Step 1: Tìm các bản ghi directOrgEx đã có giá trị exec_status này rồi tách ra làm 2 case -> create new & update info only
  return new Promise(async (res, rej) => {
    let uuidArr = req.json_data.update_arr.map((item) => item.uuid);
    let oldDXArr = await leaderDirectModels.direct_executes.getAllData({ direct_org_uuid: { $in: uuidArr } });
    let genUUIDs = [];
    // So sánh status cũ với mới và tách ra 2 object
    let dXAddOrUpdateArr = req.json_data.update_arr.reduce(
      (agg, item) => {
        const reqDxCat = DO_DX_STT_MAP[item.exec_status].DX;
        const oldUuidDx = oldDXArr.filter((old) => old.direct_org_uuid === item.uuid && old.category === reqDxCat);
        // TODO: Check nếu ko có exec_status hoặc exec_status là đang thực hiện (12) và hoàn thành % (13) thì
        // đưa vào case insert thêm bản ghi + tăng thêm update_no lên
        if (oldUuidDx.length === 0 || item.exec_status === DO_STATUS.ONGOING || item.exec_status === DO_STATUS.COMPLETE_PRCT) {
          // Lấy 1 đối tượng có direct org tương đương ở oldDXArr để có thông tin của nó
          let sampleOldDXArr = oldDXArr.find((old) => old.direct_org_uuid === item.uuid);
          let update_no = 1;
          // Nếu có exec_status thì sample sẽ là bản ghi mới nhất
          if (oldUuidDx.length > 0) {
            sampleOldDXArr = oldUuidDx.sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime())[0];
            update_no = oldUuidDx.length === 0 ? 1 : ++sampleOldDXArr.update_no;
          }
          let newUUID = generateUUID();
          genUUIDs.push({ doUUID: item.uuid, dxUUID: newUUID });
          return {
            ...agg,
            insertNewArr: [
              ...agg.insertNewArr,
              {
                ...sampleOldDXArr,
                uuid: newUUID,
                description: item.description ? item.description : "",
                category: reqDxCat,
                update_no: update_no,
                created_time: new Date().getTime(),
                created_user: req.user.username,
                status: 1,
              },
            ],
          };
        }
        // Nếu có thì tìm tất cả thằng trùng cả
        // Nếu tìm ra uuidDx trùng map category với exec_status thì update
        return {
          ...agg,
          updateInfoArr: [
            ...agg.updateInfoArr,
            { ...oldUuidDx[0], description: item.description ? item.description : "", category: reqDxCat },
          ],
        };
      },
      { updateInfoArr: [], insertNewArr: [] }
    );
    res({ ...dXAddOrUpdateArr, insertUUIDs: genUUIDs });
  });
};

module.exports = { createInitDirectExeHelper, createOrUpdateDXOnDOChanged };

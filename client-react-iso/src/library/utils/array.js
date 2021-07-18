export const createObjectFromArrField = (arr, fieldToCreate) => {
  return arr.reduce((agg, item) => {
    return;
  }, {});
};

/**
 *
 * @param {{obj}} _criteria đối tượng chứa field và giá trị cần filter
 * @param {[obj]} filterList mảng cần filter
 * @returns
 */
export const filterListInRedux = (_criteria, _filterList, mode) => {
  let keyToChecks = Object.keys(_criteria);
  let filteredList = _filterList.reduce((agg, item) => {
    let oneHotArr = keyToChecks.map((key) => {
      if (key.includes("date") || key.includes("time")) {
        let dateMilliseconds = new Date(item[key]).getTime();
        return dateMilliseconds >= _criteria[key].from && dateMilliseconds < _criteria[key].to;
      }
      // Nếu kiểm tra trong organizations thì phải check cả assessors và executors (đưa ra hàm check riêng)
      if (key === "organization") {
        return filterCheckOrgInArrHelper(_criteria[key], item);
      }
      let fieldData = _criteria[key];
      return fieldData.includes(parseInt(item[key]));
    });
    console.log("DEBUG ------------------------------------------------------------- \n", oneHotArr);
    // Nếu có 1 điều kiện không thoả mãn thì bỏ item này khỏi mảng
    if (oneHotArr.includes(false)) {
      return agg;
    }
    return [...agg, item];
  }, []);
  return filteredList;
};

const filterCheckOrgInArrHelper = (critArr, item) => {
  if (critArr && item) {
    try {
      let newAssExeArr = JSON.parse(item.executors).concat(JSON.parse(item.assessors));
      // Check newAssExe có id nào trog critArr cần lọc không
      for (const orgId of newAssExeArr) {
        if (critArr.includes(orgId)) {
          return true;
        }
      }
      return false;
    } catch (err) {
      return false;
    }
  }
};

// ------------------------------------------------------------------------------------------
// 1. Helper kiểm tra giá trị các phần tử có field khác nhau giữa 2 object (tam thời check theo board)
function returnChangedArr(_baseArr, _changedArr, ...fieldToChecks) {
  let updateArr = _baseArr.reduce((agg, item) => {
    // Duyệt qua mảng fieldToChecks để kiểm tra có thay đổi hay không
    let changeKeyValue = {};
    fieldToChecks.forEach((field) => {
      if (_changedArr[field] !== item[field]) {
        changeKeyValue[field] = _changedArr[field];
      }
      return;
    });
    if (Object.keys(changeKeyValue).length > 0) {
      return [...agg, ...changeKeyValue];
    }
    return agg;
  }, []);
  return updateArr;
}

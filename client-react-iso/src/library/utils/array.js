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
export const filterListInRedux = (_criteria, _filterList) => {
  let keyToChecks = Object.keys(_criteria);
  let filteredList = _filterList.reduce((agg, item) => {
    let oneHotArr = keyToChecks.map((key) => {
      if (key.includes("date") || key.includes("time")) {
        let dateMilliseconds = new Date(item[key]).getTime();
        return dateMilliseconds >= _criteria[key].from && dateMilliseconds < _criteria[key].to;
      }
      // Nếu kiểm tra trong organizations thì phải check cả assessors và executors
      let fieldData = _criteria[key];

      return fieldData.includes(parseInt(item[key]));
    });
    // Nếu có 1 điều kiện không thoả mãn thì bỏ item này khỏi mảng
    if (oneHotArr.includes(false)) {
      return agg;
    }
    return [...agg, item];
  }, []);
  return filteredList;
};

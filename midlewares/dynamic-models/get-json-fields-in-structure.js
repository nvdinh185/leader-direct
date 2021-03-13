/**
 * Lấy mệnh đề jsonFields theo cấu trúc (cho select dữ liệu chỉ theo bộ lọc)
 * @param {*} jsonTableStructure cấu trúc bảng chứa các tên trường
 * @param {*} jsonFields cấu trúc các trường cần lọc
 * @param {*} isFilter nếu thiết lập là true thì trả về chỉ các trường có trong cấu trúc, còn các trường khác thì bỏ qua. Trường hợp không thiết lập sẽ trả về lỗi và mệnh đề sẽ trả về null
 * OUTPUT: Trả về kết quả mệnh đề jsonFields
 */
module.exports = (jsonTableStructure, jsonFields, isFilter = false) => {
  let tmpJsonFields = {};

  // nếu mệnh đề lọc fields không cung cấp thì trả về tất cả các cột của mô hình
  if (
    !jsonFields ||
    typeof jsonFields !== "object" ||
    !Object.keys(jsonFields).length
  ) {
    for (let key in jsonTableStructure) {
      tmpJsonFields[key] = 1;
    }
  }

  // nếu cung cấp mệnh đề lọc field thì chỉ lọc các tên trường có trong mô hình thôi
  for (let key in jsonFields) {
    if (!jsonTableStructure[key]) {
      if (!isFilter) {
        return {
          error: `Không tìm thấy tên trường ${key} trong mô hình bảng`,
        };
      }
    } else {
      // có tồn tại thì lọc lấy
      tmpJsonFields[key] = jsonFields[key];
    }
  }

  return {
    data: tmpJsonFields,
  };
};

/**
 * Xác nhận tên trường có tồn tại trong cấu trúc bảng hay không
 * Nếu có thì trả về json đúng, nếu không tồn tại trong cấu trúc trả về lỗi
 */

/**
 *
 * @param {*} jsonTableStructure cấu trúc của bảng
 * @param {*} jsonFields cấu trúc của mệnh đề where, field, sort
 * @param {*} isFilter nếu thiết lập là true thì trả về chỉ các trường có trong cấu trúc, còn các trường khác thì bỏ qua. Trường hợp không thiết lập sẽ trả về lỗi và mệnh đề sẽ trả về null
 * OUTPUT: Trả về kết quả của mệnh đề jsonWhere hoặc jsonField
 */
module.exports = (jsonTableStructure, jsonFields, isFilter = false) => {
  let jsonWhereFieldsSort = {};

  if (
    !jsonFields ||
    typeof jsonFields !== "object" ||
    !Object.keys(jsonFields).length
  ) {
    return {
      data: {},
    };
  }

  for (let key of Object.keys(jsonFields)) {
    // nếu lọc thì không trả lỗi nữa
    if (!jsonTableStructure[key]) {
      if (!isFilter) {
        return {
          error: `Không tìm thấy tên trường ${key} trong cấu trúc bảng`,
        };
      }
    } else {
      jsonWhereFieldsSort[key] = jsonFields[key];
    }
  }
  return {
    data: jsonWhereFieldsSort,
  };
};

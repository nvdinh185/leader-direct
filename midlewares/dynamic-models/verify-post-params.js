const verifyFieldsInTableStructure = require("./verify-fields-in-table-structure");
const getJsonFieldsInStructure = require("./get-json-fields-in-structure");

/**
 * Xác nhận các mệnh đề json đưa lên hợp lệ
 * @param {*} jsonTableStructure
 * @param {*} where
 * @param {*} field
 * @param {*} sort
 * @param {*} isFilter
 * nếu thiết lập là true thì trả về chỉ các trường có trong cấu trúc, còn các trường khác thì bỏ qua.
 * Trường hợp không thiết lập sẽ trả về lỗi và mệnh đề sẽ trả về null
 */
module.exports = (jsonTableStructure, where, field, sort, isFilter = false) => {
  // lấy danh mục các trường trong cấu trúc thôi, không phải select hết bảng
  // hạn chế select * from
  let vField = getJsonFieldsInStructure(jsonTableStructure, field, isFilter);

  let vWhere = verifyFieldsInTableStructure(
    jsonTableStructure,
    where,
    isFilter
  );

  let vSort = verifyFieldsInTableStructure(jsonTableStructure, sort, isFilter);

//   console.log("XXX>INPUT", where, field, sort);
//   console.log("XXX>OUTPUT", vWhere, vField, vSort);

  return {
    jsonWhere: vWhere.data,
    jsonFields: vField.data,
    jsonSort: vSort.data,
    errorMessage: vWhere.error || vField.error || vSort.error,
  };
};

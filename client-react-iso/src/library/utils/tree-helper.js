/**
 * Gọi hồi quy để dựng menu đa cấp ()
 * @param {[obj]} menuArr mảng chứa tất cả bản ghi menu
 * @param {[obj]} children mảng chứa các đối tượng con (ở đây dùng rest để nhặt mấy thằng con được spread từ menu sau khi filter)
 * @returns mảng menu theo định dạng
 * KEY MENU TO TEST:
    {
      key: child.page,
      label: child.name,
      leftIcon: child.icon
    }
 */
export const createNestedMenuFromDb = (sourceDbArr, fields, ...children) => {
  const childMenus = children.map((child) => {
    let dbChild = sourceDbArr.filter((menu) => menu.parent_id === child.id);
    // Trường hợp không tìm thấy db child thì cha này hết con rồi
    if (dbChild.length === 0) {
      return { key: child.page, label: child.name, leftIcon: child.icon };
    }
    // Trường hợp tìm thấy db child thì tạo thông tin thằng cha rồi hồi quy tìm thằng con
    let itemReduces = fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.keyName]: child[field.dbName],
      };
    }, {});
    return {
      ...itemReduces,
      children: createNestedMenuFromDb(sourceDbArr, fields, ...dbChild),
    };
  });
  return childMenus;
};

/**
 * Trả về 1 node bất kỳ dựa vào giá trị id truyền vào
 * Vd: truyền vào org là Qtr thì load hết thằng con của nó là (Qtr 1 2 3, cửa hàng ..., vp cn -> tổ)
 * @param {integer}  id id node cha cần tìm
 * @param {[]} recordArr mảng các giá trị gốc lấy từ db lên
 * @param {[obj]} fields Map giữa các trường cần tạo (gồm tên trường cần tạo và tên trường này để lấy ở db)
 */
export const returnTreeStructureOfMenuId = (id, recordArr, fields) => {
  // Step 1: tìm id trong record arr để hồi quy
  const record = recordArr.find((re) => re.id === id);
  if (record) {
    let nestedObj = createNestedMenuFromDb(recordArr, fields, ...[record]);
    return nestedObj;
  }
  return [];
};

/**
 * Gọi hồi quy để dựng menu đa cấp ()
 * @param {[obj]} menuArr mảng chứa tất cả bản ghi menu
 * @param {[obj]} children mảng chứa các đối tượng con (ở đây dùng rest để nhặt mấy thằng con được spread từ menu sau khi filter)
 * @returns mảng menu theo định dạng
 */
export const createNestedMenuFromDb = (menuArr, ...children) => {
  const childMenus = children.map((child) => {
    let dbChild = menuArr.filter((menu) => menu.parent_id === child.id);
    if (dbChild.length === 0) {
      return { key: child.page, label: child.name, leftIcon: child.icon };
    }
    return { key: child.page, label: child.name, leftIcon: child.icon, children: createNestedMenuFromDb(menuArr, ...dbChild) };
  });
  return childMenus;
};

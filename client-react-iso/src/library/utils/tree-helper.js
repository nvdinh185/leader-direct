export const createNestedFromDb = (array) => {
  if (array?.[0]) {
    return array.reduce((acc, item) => {
      // Nếu có parent_id tức là mảng con thì trả về accum luôn
      if (item.parent_id) {
        return acc;
      }
      if (item?.tag_children_id?.length > 0) {
        acc.push({
          key: item.page,
          label: item.name,
          leftIcon: item.icon,
          children: createChildNode(item.tag_children_id, array),
        });
        return acc;
      }
      acc.push({
        key: item.page,
        label: item.name,
        leftIcon: item.icon,
      });
      return acc;
    }, []);
  }
};

const createChildNode = (childIdArr, menus) => {
  if (childIdArr) {
    return JSON.parse(childIdArr).map((id) => {
      console.log("DEBUG ------------------------------------------------------------- \n", childIdArr, menus);
      const menu = menus.find((menu) => menu.id === id);
      return {
        key: menu.page,
        label: menu.name,
      };
    });
  }
};

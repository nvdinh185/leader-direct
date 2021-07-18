import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useUserMenu() {
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const groups = useSelector((state) => state.adminUser.groups);
  const menus = useSelector((state) => state.adminUser.menus);
  const [state, setstate] = useState();
  // TODO: Write logic to check user right here
  function returnUniqueMenus(_userInfo, _groups, _menus) {
    let userMenus = [];
    if (_userInfo && _menus && _menus.length > 0 && _groups && _groups.length > 0) {
      let userGroups = JSON.parse(_userInfo.function_groups);
      if (userGroups) {
        // Duyệt qua mảng groups rồi lấy về các menu duy nhất (sắp xếp theo order)
        userMenus = userGroups.reduce((agg, group) => {
          let foundGroup = _groups.find((fgroup) => fgroup.id === group);
          console.log("DEBUG ------------------------------------------------------------- \n", foundGroup);
          let menusGroup = JSON.parse(foundGroup.menus_granted);
          let groupMenusArr = [...new Set(_menus.filter((menu) => menusGroup.includes(menu.id)))];
          return [...agg, ...groupMenusArr];
        }, []);
      }
    }
    userMenus = userMenus.sort((a, b) => a.order - b.order);
    return userMenus;
  }

  useEffect(() => {
    let userMenus = returnUniqueMenus(userInfo, groups, menus);
    setstate(userMenus);
  }, [userInfo, menus, groups]);

  return state;
}

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useUserMenu() {
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const [state, setstate] = useState();

  const returnIsAdminUser = React.useCallback((_userInfo) => {
    let isAdmin = false;
    // TODO: Write logic to check user is admin here
    //
    return isAdmin;
  });

  useEffect(() => {
    if (userInfo) {
      setstate(returnIsAdminUser(userInfo));
    }
  }, [userInfo]);

  return state;
}

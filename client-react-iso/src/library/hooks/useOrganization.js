import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Hook này trả về danh sách org user có thể truy cập được dựa trên thông tin user
 * @returns {[org]}
 */

export default function useGetUserAuthOrg() {
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const [state, setState] = useState();

  const returnAuthOrgList = (_userInfo, _organizations) => {
    let userOrgId = parseInt(_userInfo.organization);
    console.log("DEBUG USERINFO ------------------------------------------------------------- \n", _userInfo.isAdmin);
    if (_userInfo.isAdmin) {
      return _organizations;
    }
    return _organizations.filter((org) => org.id === parseInt(userOrgId));
  };

  useEffect(() => {
    if (userInfo) {
      let authOrgs = returnAuthOrgList(userInfo, organizations);
      console.log("DEBUG ORG ------------------------------------------------------------- \n", authOrgs);
      setState(authOrgs);
    }
  }, [userInfo, organizations]);

  return state;
}

import * as directOrgTypes from "@redux/directOrgs/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultDirectOrgs = {
  directOrgs: [],
  loading: false,
  err: "",
};

export default function directReducer(state = defaultDirectOrgs, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // 0 - NON API DIRECT ORGS SECTION
    // ---------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------
    // 1 - CALL API DIRECT ORGS SECTION
    // ---------------------------------------------------------------------------------
    case directOrgTypes.GET_DIRECT_ORG_ALL_START:
      return {
        ...state,
        loading: true,
      };
    case directOrgTypes.GET_DIRECT_ORG_ALL_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        err: "",
        directOrgs: action.payload,
        loading: false,
      };

    case directOrgTypes.GET_DIRECT_ORG_ALL_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case directOrgTypes.GET_DIRECT_ORG_BY_ORG_START:
      return {
        ...state,
        loading: true,
      };
    case directOrgTypes.GET_DIRECT_ORG_BY_ORG_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false };
      }
      return {
        ...state,
        err: "",
        directOfOrgs: action.payload,
        loading: false,
      };

    case directOrgTypes.GET_DIRECT_ORG_BY_ORG_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case directOrgTypes.UPDATE_DIRECT_ORG_START:
      return {
        ...state,
        loading: true,
      };
    case directOrgTypes.UPDATE_DIRECT_ORG_SUCCESS:
      successAlert("Thành Công", "Bạn đã sửa thông tin chỉ đạo của đơn vị thành công");
      return {
        ...state,
        err: "",
        updateDirectOrg: action.payload,
        loading: false,
      };
    case directOrgTypes.UPDATE_DIRECT_ORG_FAIL:
      errorAlert("Lỗi", "Lỗi khi sửa thông tin chỉ đạo của đơn vị: " + action.payload.message);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

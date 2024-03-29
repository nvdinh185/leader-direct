import * as directOrgTypes from "@redux/directOrgs/types";
import { successAlert, errorAlert, warningAlert } from "@components/AlertModal/ModalInfo";

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
    case directOrgTypes.SET_BOARD_UPDATE_ARR:
      return {
        ...state,
        boardUpdateArr: action.payload,
      };

    case directOrgTypes.FILTER_DIRECT_ORG_ARR_REDUX:
      if (!action.payload) {
        return {
          ...state,
        };
      }
      if (action.payload?.length === 0) {
        return {
          ...state,
          directOrgFilter: state.directOrgs,
        };
      }
      let newOrgArrData = state.directOrgs?.filter((da) => action.payload.includes(da.organization_id));
      return {
        ...state,
        directOrgFilter: newOrgArrData,
      };
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
        directOrgAll: action.payload,
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
    case directOrgTypes.GET_FILTER_DIRECT_ORG_START:
      return {
        ...state,
        loading: true,
      };
    case directOrgTypes.GET_FILTER_DIRECT_ORG_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, directOrgFilter: [], loading: false };
      }
      return {
        ...state,
        err: "",
        directs: action.payload.directs || [],
        directOrgs: action.payload.directOrgs,
        directOrgFilter: action.payload.directOrgs,
        formFilter: action.payload.form,
        loading: false,
      };

    case directOrgTypes.GET_DIRECT_EXE_BY_DOS_FAIL:
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
    // ---------------------------------------------------------------------------------
    case directOrgTypes.UPDATE_DIRECT_EXECUTES_DO_START:
      return {
        ...state,
        loading: true,
      };
    case directOrgTypes.UPDATE_DIRECT_EXECUTES_DO_SUCCESS:
      successAlert("Thành Công", "Bạn đã cập nhập thông tin chỉ đạo của đơn vị thành công");
      return {
        ...state,
        err: "",
        updateDODX: action.payload,
        loading: false,
      };
    case directOrgTypes.UPDATE_DIRECT_EXECUTES_DO_FAIL:
      errorAlert("Lỗi", "Lỗi khi cập nhập thông tin chỉ đạo của đơn vị: " + action.payload.message);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 3 - ATTACHMENTS SECTION
    // ---------------------------------------------------------------------------------
    case directOrgTypes.GET_DO_ATTACHMENTS_START:
      return {
        ...state,
        loading: true,
      };
    case directOrgTypes.GET_DO_ATTACHMENTS_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        attachments: action.payload,
        loading: false,
      };

    case directOrgTypes.GET_DO_ATTACHMENTS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

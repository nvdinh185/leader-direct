import React from "react";
import { useHistory } from "react-router";
// import { useSelector } from "react-redux";
// import { confirmAlert } from "@components/AlertModal/ModalInfo";

const initBeforeUnLoad = (history) => {
  window.onbeforeunload = (event) => {
    sessionStorage.setItem("currentPath", history.location.pathname);
  };
};

/**
 * Hook lưu url react router hiện tại vào session storage
 * khi có sự kiện refresh thì dùng history push ngược vào lại (đảm bảo lấy lại dữ liệu
 * và không bị redirect trang do thư viện của sếp)
 */
export default function () {
  const history = useHistory();

  React.useEffect(() => {
    window.onload = function () {
      initBeforeUnLoad(history);
      let currentPath = sessionStorage.getItem("currentPath");
      if (currentPath) {
        history.push(currentPath);
      }
    };
    return () => {};
  }, [history]);
}

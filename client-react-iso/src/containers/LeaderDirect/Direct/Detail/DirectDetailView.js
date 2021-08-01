import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getDirectByIds } from "@redux/directs/actions";
import DetailView from "@components/Directs/DetailView";

export default function DirectDetailView() {
  const directUuid = useRouteMatch().params.id;

  const token = useSelector((state) => state.Auth.idToken);
  const currentDirect = useSelector((state) => state.directs.currentDirect);
  const dispatch = useDispatch();

  // Effect này dùng trong trường hợp refresh lại trang lấy direct nếu ở meeting view
  useEffect(() => {
    if (!currentDirect || Object.keys(currentDirect).length === 0) {
      dispatch(getDirectByIds(token, { uuidArr: JSON.stringify([directUuid]) }, "CURRENT_DIRECT"));
      return;
    }
  }, [currentDirect]);

  return (
    <>
      <DetailView currentDirect={currentDirect}></DetailView>
    </>
  );
}

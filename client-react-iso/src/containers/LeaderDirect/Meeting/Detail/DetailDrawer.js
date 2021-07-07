import React, { Fragment, useState, useEffect } from "react";
import drawerActions from "@redux/drawer/actions";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "antd";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
// import { IconSvg } from "@components/LeaderDirect/IconSvg";
import MeetingDetailHeader from "@containers/LeaderDirect/Meeting/Detail/DetailHeader";
import { CardDetailsWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";

import DetailInfo from "./DetailInfo";
import DetailAttachs from "./DetailAttachs";
import DetailDirects from "./DetailDirects";

// import { useRouteMatch, useHistory, useLocation } from "react-router-dom";

export default function DetailDrawer(props) {
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const meeting = useSelector((state) => state.drawer.drawerProps?.meeting);
  const dispatch = useDispatch();

  const [originMeeting, setOriginMeeting] = useState();

  useEffect(() => {
    if (meetings?.[0] && !originMeeting) {
      setOriginMeeting(meetings.find((meeting) => meeting.id === meeting.id));
    }
  }, [meetings]);

  return (
    <CardDetailsWrapper>
      {/* // ---------------------------------------------------------------------------------  */}
      <MeetingDetailHeader
        onBtnClick={() => {
          //   editTask(meeting);
          dispatch(
            drawerActions.openDrawer({
              drawerType: "CREATE_OR_EDIT_MEETING",
              drawerProps: {
                initials: { ...meeting, editing: true },
              },
            })
          );
        }}
        onIconClick={() => dispatch(drawerActions.closeDrawer())}
      />
      {/* // ---------------------------------------------------------------------------------  */}

      {/* // ---------------------------------------------------------------------------------  */}
      <DetailInfo meeting={meeting}></DetailInfo>
      <Divider />

      {/* // ---------------------------------------------------------------------------------- */}
      <DetailAttachs meeting={meeting}></DetailAttachs>
      <Divider />
      {/* // ---------------------------------------------------------------------------------- */}
      <DetailDirects></DetailDirects>
    </CardDetailsWrapper>
  );
}

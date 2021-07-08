import React from "react";
import IntlMessages from "@components/utility/intlMessages";
import LayoutWrapper from "@components/utility/layoutWrapper";
import MeetingView from "@containers/LeaderDirect/Meeting/MeetingView";
import PageHeader from "@components/utility/pageHeader";

export default function () {
  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.leaderMeeting" />}</PageHeader>
      <MeetingView></MeetingView>
    </LayoutWrapper>
  );
}

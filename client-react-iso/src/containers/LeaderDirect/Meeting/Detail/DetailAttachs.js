import React from "react";
import AttachmentIcon from "@assets/images/icon/01-icon.svg";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import { AttachmentWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";

export default function DetailAttachs() {
  return (
    <>
      <AttachmentWrapper>
        <HeadingWithIcon heading="Tệp Đính Kèm" iconSrc={AttachmentIcon} />
      </AttachmentWrapper>
    </>
  );
}

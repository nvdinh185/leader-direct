import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { returnAttchArr } from "@lib/utils/string";
import { getFile } from "@apis/meetings";
import { base64toBlob } from "@lib/utils/file";
import { deleteAttachmentsArr, getAttachmentByIds } from "@redux/meetings/actions";
import { mapFileColor } from "@constants/fileTypes";

import AttachmentIcon from "@assets/images/icon/01-icon.svg";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import { AttachmentWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";
import BadgeAttach from "./BadgeAttach";

export default function DetailAttachs({ meeting, ...props }) {
  let attachArr = returnAttchArr(meeting.attachments);

  const token = useSelector((state) => state.Auth.idToken);
  const attachments = useSelector((state) => state.directMeeting.attachments);
  const dispatch = useDispatch();

  const [attchmentInfos, setAttchmentInfos] = useState([]);

  // Effect to get attachments info here
  useEffect(() => {
    if (meeting.attachments && attachArr && attachArr.length > 0 && token) {
      let attchJsonArr = attachArr.map((attch) => ({ uuid: attch }));
      if (attchJsonArr && attchJsonArr?.[0]) {
        dispatch(getAttachmentByIds(token, JSON.stringify(attchJsonArr)));
      }
    }
  }, [meeting, token]);

  // Effect to render attachment to view
  useEffect(() => {
    if (attachments?.[0]) {
      let newAttchs = attachments.map((attch) => {
        let fileType = mapFileColor.find((map) => map.fileType === attch.file_type);
        return {
          uuid: attch.uuid,
          url: attch.url,
          fileName: attch.file_name,
          fileType: attch.file_type,
          fileTypeIcon: fileType ? fileType.fileTypeIcon : "",
          color: fileType ? fileType.color : "",
        };
      });
      console.log(newAttchs);
      setAttchmentInfos(newAttchs);
    }
  }, [attachments]);

  useEffect(() => {
    return () => {
      dispatch(deleteAttachmentsArr());
    };
  }, []);

  const handleDeleteAttachMent = (uuid) => {
    console.log("Handle Delete Attachment", uuid);
  };

  const handleDownloadAttachment = (uuid, url, mime, fileName) => {
    if (url) {
      console.log("Handle Download Attachment", uuid, url);
      getFile(token, { url: url }).then((res) => {
        let blob = base64toBlob(res.data, mime);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = `${fileName}`;
        a.click();
      });
    }
  };

  return (
    <>
      <AttachmentWrapper>
        <HeadingWithIcon heading="Tệp Đính Kèm" iconSrc={AttachmentIcon} />
      </AttachmentWrapper>
      {attchmentInfos.length > 0
        ? attchmentInfos.map((attch, idx) => (
            <BadgeAttach
              key={idx}
              uuid={attch.uuid}
              fileType={attch.fileType}
              fileName={attch.fileName}
              color={attch.color}
              url={attch.url}
              handleDeleteAttachMent={handleDeleteAttachMent}
              handleDownloadAttachment={handleDownloadAttachment}
            >
              {attch.fileTypeIcon ? <attch.fileTypeIcon /> : null}
            </BadgeAttach>
          ))
        : null}
    </>
  );
}

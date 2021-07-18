import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttachmentByIds } from "@redux/directOrgs/actions";
import { mapFileColor } from "@constants/fileTypes";
import AttachmentIcon from "@assets/images/icon/01-icon.svg";
import BadgeAttach from "@containers/LeaderDirect/Meeting/Detail/BadgeAttach";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";

export default function TaskAttachs({ task }) {
  const token = useSelector((state) => state.Auth.idToken);
  const attachments = useSelector((state) => state.directOrgs.attachments);
  const dispatch = useDispatch();

  const [attchmentInfos, setAttchmentInfos] = useState([]);

  // Effect to get attachments info here
  useEffect(() => {
    if (task.attachments && token) {
      let attchJsonArr = task.attachments.map((attch) => ({ uuid: attch }));
      if (attchJsonArr && attchJsonArr?.[0]) {
        dispatch(getAttachmentByIds(token, JSON.stringify(attchJsonArr)));
      }
    }
  }, [task, token]);

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
      setAttchmentInfos(newAttchs);
    }
  }, [attachments]);

  return (
    <>
      <HeadingWithIcon heading="Tệp Đính Kèm" iconSrc={AttachmentIcon} />
      {attchmentInfos > 0
        ? attchmentInfos.map((attch, idx) => (
            <BadgeAttach
              key={idx}
              uuid={attch.uuid}
              fileType={attch.fileType}
              fileName={attch.fileName}
              color={attch.color}
              url={attch.url}
              // handleDeleteAttachMent={handleDeleteAttachMent}
              // handleDownloadAttachment={handleDownloadAttachment}
            >
              {attch.fileTypeIcon ? <attch.fileTypeIcon /> : null}
            </BadgeAttach>
          ))
        : null}
    </>
  );
}

import React, { useEffect, useState } from "react";
import AttachmentIcon from "@assets/images/icon/01-icon.svg";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import { AttachmentWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";
import { returnAttchArr } from "@lib/utils/string";
import BadgeAttach from "./BadgeAttach";
import { mapFileColor, xlsxMime, docxMime, pdfMime } from "@constants/fileTypes";
import { FilePdfFilled, FileExcelFilled, FileWordFilled } from "@ant-design/icons";

export default function DetailAttachs({ meeting, ...props }) {
  let attachArr = returnAttchArr(meeting.attachments);

  const [attchmentInfos, setAttchmentInfos] = useState([
    { fileName: "Hieu Test Badge Excel File.xlsx", uuid: "12312", fileType: <FileExcelFilled />, color: "green" },
    { fileName: "Hieu Test Badge PDF File.pdf", uuid: "12312", fileType: <FilePdfFilled />, color: "red" },
    { fileName: "Hieu Test Badge Word File.docx", uuid: "12312", fileType: <FileWordFilled />, color: "blue" },
  ]);

  // Effect to get attachments info here
  useEffect(() => {
    if (meeting.attachments && attachArr && attachArr.length > 0) {
      // TODO: Call API to get info of attachments here
      // let newArr = [];
      // setAttchmentInfos(newArr);
    }
  }, [meeting]);

  const handleDeleteAttachMent = (uuid) => {
    console.log("Handle Delete Attachment", uuid);
  };

  return (
    <>
      <AttachmentWrapper>
        <HeadingWithIcon heading="Tệp Đính Kèm" iconSrc={AttachmentIcon} />
      </AttachmentWrapper>
      {attchmentInfos
        ? attchmentInfos.map((attch, idx) => (
            <BadgeAttach
              key={idx}
              uuid={attch.uuid}
              fileType={attch.fileType}
              fileName={attch.fileName}
              color={attch.color}
              handleDeleteAttachMent={handleDeleteAttachMent}
            ></BadgeAttach>
          ))
        : null}
    </>
  );
}

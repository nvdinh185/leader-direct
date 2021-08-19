const { convertDateToDDMMYYY } = require("../createUpdate/GeneralHelper");
let { DO_STATUS, DX_STATUS } = require("../constants/index");

const filterDataForReportAgg = (organizationArr, directOrgArr, jsonData) => {
  let rpResult = organizationArr.map((org, idx) => {
    // Chỉ đạo được giao
    let _countDirect = directOrgArr.filter((exe) => exe.organization_id === org.id && exe.status === 1).length;
    // Chỉ đạo hoàn thành
    let _countDirectComplete = directOrgArr.filter((exe) => exe.exec_status === DO_STATUS.COMPLETE && exe.status === 1).length;
    // Hoàn thành chưa phê duyệt
    // Đang thực hiện
    let _countDirectOnGoing = directOrgArr.filter(
      (exe) => exe.organization_id === org.id && exe.exec_status === DO_STATUS.ONGOING && exe.status === 1
    ).length;
    // Gia hạn lần 1
    let _countDirectExt1 = directOrgArr.filter(
      (exe) => exe.organization_id === org.id && exe.exec_status === DO_STATUS.EXTEND1 && exe.status === 1
    ).length;

    return {
      stt: idx + 1,
      organization: org.name,
      countDirect: _countDirect !== 0 ? _countDirect : "",
      countDirectComplete: _countDirectComplete !== 0 ? _countDirectComplete : "",
      countDirectOngoing: _countDirectOnGoing !== 0 ? _countDirectOnGoing : "",
      countDirectExt1: _countDirectExt1 !== 0 ? _countDirectExt1 : "",
    };
  });
  return rpResult;
};

const filterDataForReportDetail = (categoryArr, organizationArr, meetingArr, directArr, directOrgArr, directExeArr, jsonData) => {
  let rpResult = directOrgArr.reduce((agg, dorg, idx) => {
    let meetingInfo = meetingArr.find((meeting) => dorg.meeting_id === meeting.id);
    let organizationInfo = organizationArr.find((org) => org.id === dorg.organization_id);
    let directInfo = directArr.find((direct) => direct.uuid === dorg.direct_uuid);
    let leaderInfo = categoryArr.find((cat) => cat.id === directInfo.leader);
    let exeStatusInfo = categoryArr.find((cat) => cat.id === dorg.exec_status);
    // TODO: nếu trường hợp ko phải là chọn tất cả và org hoặc leader này không nằm trong mảng filter thì bỏ qua
    if (!jsonData.organizations.includes(-1) && !jsonData.organizations.includes(organizationInfo.id)) {
      return agg;
    }
    if (!jsonData.leaders.includes(-1) && !jsonData.leaders.includes(leaderInfo.id)) {
      return agg;
    }
    if (!jsonData.statuses.includes(-1) && !jsonData.statuses.includes(exeStatusInfo.id)) {
      return agg;
    }
    let directCatInfo = categoryArr.find((cat) => cat.id === directInfo.category);
    let directExeDescArr = directExeArr.filter((dexe) => dexe.direct_org_uuid === dorg.uuid);
    let directExeDescStr = directExeDescArr.map((dexeDesc) => {
      if (dexeDesc.category === DX_STATUS.CREATE_DIRECT) {
        return;
      }
      return `[${convertDateToDDMMYYY(new Date(dexeDesc.created_time))}]: ${dexeDesc.description}`;
    });
    directExeDescStr = directExeDescStr.join("\n");
    return [
      ...agg,
      {
        stt: idx + 1,
        meetingName: meetingInfo.name,
        leaderName: leaderInfo.name,
        directDate: convertDateToDDMMYYY(new Date(directInfo.created_time)),
        directDescription: directInfo.description,
        dueDate: directInfo.due_date ? convertDateToDDMMYYY(new Date(directInfo.due_date)) : directCatInfo.name,
        organization: organizationInfo.name,
        directExeDescription: directExeDescStr,
        execStatus: exeStatusInfo.name,
        updatedTime: dorg.updated_time ? convertDateToDDMMYYY(new Date(dorg.updated_time)) : "",
        completeTime: exeStatusInfo.id === DO_STATUS.COMPLETE ? convertDateToDDMMYYY(new Date(dorg.updated_time)) : "",
      },
    ];
  }, []);
  return rpResult;
};

module.exports = {
  filterDataForReportAgg,
  filterDataForReportDetail,
};

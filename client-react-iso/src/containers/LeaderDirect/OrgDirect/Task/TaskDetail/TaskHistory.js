import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TimeLine from "@components/uielements/timeline";
import { TimelineItem } from "@components/uielements/timeline";
import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";

const HistoryItem = ({ histories }) => {
  return <TimelineItem></TimelineItem>;
};

export default function TaskHistory({ task }) {
  //   console.log(task);
  const histories = useSelector((state) => state.directOrgs.directExeDos);
  const exeTypes = useSelector((state) => state.filterData.exeTypes);

  const [taskHistory, setTaskHistory] = useState();

  // Effect để lấy ra thông tin history của task này
  useEffect(() => {
    if (histories?.[0]) {
      let taskHis = histories.filter((his) => his.direct_org_uuid === task.task.id);
      console.log(taskHis);
      setTaskHistory(taskHistory);
    }
  }, [histories]);

  return (
    <>
      <div>Task History</div>
      <TimeLine>
        <TimelineItem>Create a services site 2015-09-01</TimelineItem>
        <TimelineItem color="green">Solve initial network problems 2015-09-01</TimelineItem>
        <TimelineItem dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </TimelineItem>
        <TimelineItem color="red">Network problems being solved 2015-09-01</TimelineItem>
        <TimelineItem>Create a services site 2015-09-01</TimelineItem>
        <TimelineItem dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}>Technical testing 2015-09-01</TimelineItem>
      </TimeLine>
      ,
    </>
  );
}

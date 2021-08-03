export const generateColumnDnd = (colInfos, data, fieldOfCol) => {
  if (colInfos?.[0]) {
    let boardNCols = createBoard(colInfos, data);
    let boardData = createBoardColsData(data, fieldOfCol);
    return [boardNCols, boardData];
  }
};

// Nhận mảng các status vào và trả về board có cols là các id
const createBoard = (colInfos, data) => {
  if (colInfos?.[0]) {
    let boardCols = colInfos.map((stat) => "col-" + stat.id);
    let boardColInfos = createBoardColsInfo(colInfos, data);

    return {
      board: {
        status: {
          id: "status",
          column_orders: boardCols,
          title: "Trạng Thái Chỉ Đạo",
          editting: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
      columns: boardColInfos,
    };
  }
};

const createBoardColsInfo = (colInfos, data) => {
  // TODO: Dựa vào col và data để đưa các data vào col phù hợp
  // Tạo object có định dạng {status-code: [task-id]}
  let colMapData = data.reduce((agg, item) => {
    // Nếu đã có thì push vào
    if (Object.keys(agg).includes("" + item.exec_status)) {
      return { ...agg, [item.exec_status]: [...agg[item.exec_status], item.uuid] };
    }
    // CHưa có thì tạo mới
    return { ...agg, [item.exec_status]: [item.uuid] };
  }, {});
  let boardColInfos = colInfos.reduce((agg, status) => {
    return {
      ...agg,
      ["col-" + status.id]: {
        id: "col-" + status.id,
        board_id: "status",
        task_orders: colMapData[status.id] ? colMapData[status.id] : [],
        title: status.name,
        editing: false,
      },
    };
  }, {});
  return boardColInfos;
};

const createBoardColsData = (data, field) => {
  if (data?.[0]) {
    let boardData = data.reduce((agg, item) => {
      return {
        ...agg,
        [item.uuid]: {
          id: item.uuid,
          column_id: "col-" + item[field],
          title: item.description,
          description: item.description,
          due_date: item.due_date ? item.due_date : new Date(),
          attachments: item.attachments ? item.attachments : [],
          comments: item.histories ? JSON.parse(item.histories) : [],
          created_at: item.created_time,
          updated_at: item.updated_time,
          direct_uuid: item.direct_uuid,
          organization_exe: item.organization_exe ? item.organization_exe : null,
          organization_id: item.organization_id ? item.organization_id : null,
        },
      };
    }, {});
    return boardData;
  }
};

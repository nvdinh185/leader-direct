export const generateColumnDnd = (colInfos, data, fieldOfCol) => {
  if (colInfos?.[0] && data?.[0]) {
    let boardNCols = createBoardData(colInfos);
    let boardData = createBoardColsData(data, fieldOfCol);
    return [boardNCols, boardData];
  }
};

// Nhận mảng các status vào và trả về board có cols là các id
const createBoardData = (colInfos) => {
  if (colInfos && colInfos.length > 0) {
    let boardCols = colInfos.map((stat) => "col-" + stat.id);
    let boardColInfos = createBoardColsData(boardCols);
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

const createBoardColsInfo = (colInfos) => {
  if (colInfos && colInfos.length > 0) {
    let colInfos = colInfos.reduce((agg, status) => {
      return {
        ...agg,
        ["col-" + item.id]: {
          id: "col-" + status.id,
          board_id: "status",
          task_orders: [],
          title: status.name,
          editing: false,
        },
      };
    }, {});
    return colInfos;
  }
};

const createBoardColsData = (data, field) => {
  if (data?.[0]) {
    let boardData = data.map((item) => {
      return {
        id: item.id,
        column_id: "col-" + item[field],
        title: item.description,
        description: item.description,
        due_date: item.due_date,
        attachments: item.attachments ? item.attachments : [],
        created_at: item.created_time,
        updated_at: item.updated_time,
      };
    });
    return boardData;
  }
};

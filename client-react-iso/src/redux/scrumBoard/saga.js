// saga.js
import { all, takeEvery, put, select } from "redux-saga/effects";
import scrumBoardActions from "./actions";
import { loadState, saveState } from "@lib/helpers/localStorage";
import { generateColumnDnd } from "@lib/utils/dnd";

const getScrumBoards = (state) => state.scrumBoard;

function* boardRenderEffectSaga({ payload }) {
  let scrum_boards;
  let boards;
  let columns;
  let tasks;
  if (payload) {
    const [boardNCols, boardData] = generateColumnDnd(payload.statuses, payload.data, payload.field);
    boards = boardNCols.board;
    columns = boardNCols.columns;
    tasks = boardData ? boardData : [];
    // console.log("DEBUG CREATE BOARD ------------------------------------------------------------- ", boardNCols, boardData);
  }

  yield put(
    scrumBoardActions.setBoardData({
      boards,
      columns,
      tasks,
    })
  );
}

function* moveColumnEffectSaga({ payload: { board_id, column_orders } }) {
  let scrum_boards = yield select(getScrumBoards);
  const boards = {
    ...scrum_boards.boards,
    [board_id]: {
      ...scrum_boards.boards[board_id],
      column_orders: column_orders,
    },
  };
  scrum_boards = {
    ...scrum_boards,
    boards: boards,
  };
  saveState("scrum_boards", scrum_boards);

  yield put(scrumBoardActions.setMovedColumn(boards));
}

function* createOrUpdateTaskEffectSaga(action) {
  let scrum_boards = yield select(getScrumBoards);
  const tasks = {
    ...scrum_boards.tasks,
    [action.payload.id]: { ...action.payload, editing: false },
  };
  let columns = scrum_boards.columns;
  if (!action.payload.editing) {
    columns = {
      ...scrum_boards.columns,
      [action.payload.column_id]: {
        ...scrum_boards.columns[action.payload.column_id],
        task_orders: [...scrum_boards.columns[action.payload.column_id].task_orders, action.payload.id],
      },
    };
  }

  scrum_boards = {
    columns: columns,
    tasks: tasks,
    boards: scrum_boards.boards,
  };
  saveState("scrum_boards", scrum_boards);

  yield put(scrumBoardActions.createOrUpdateTask({ tasks, columns }));
}

function* moveTaskEffectSaga({ payload: { tasks, columns } }) {
  let scrum_boards = yield select(getScrumBoards);
  scrum_boards = {
    columns: columns,
    tasks: tasks,
    boards: scrum_boards.boards,
  };
  saveState("scrum_boards", scrum_boards);
  yield put(scrumBoardActions.setMovedTask({ columns, tasks }));
}

export default function* scrumBoardSaga() {
  yield all([
    takeEvery(scrumBoardActions.LOAD_CURRENT_BOARD_DATA_SAGA, boardRenderEffectSaga),
    takeEvery(scrumBoardActions.MOVE_COLUMN_WATCHER, moveColumnEffectSaga),
    takeEvery(scrumBoardActions.CREATE_OR_UPDATE_TASK_WATCHER, createOrUpdateTaskEffectSaga),
    takeEvery(scrumBoardActions.MOVE_TASK_WATCHER, moveTaskEffectSaga),
  ]);
}

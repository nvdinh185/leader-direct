// saga.js
import { all, takeEvery, put, select } from "redux-saga/effects";
import scrumBoardActions from "./actions";
import DemoData from "./data";
import { loadState, saveState } from "@lib/helpers/localStorage";

const getScrumBoards = (state) => state.scrumBoard;

function* boardRenderEffectSaga({ payload }) {
  let scrum_boards;
  let boards;
  let columns;
  let tasks;
  // TODO: render board base on data from server instead of localStorage
  if (localStorage.hasOwnProperty("scrum_boards")) {
    scrum_boards = loadState("scrum_boards");
    boards = scrum_boards.boards;
    columns = scrum_boards.columns;
    tasks = scrum_boards.tasks;
  } else {
    scrum_boards = DemoData;
    boards = DemoData.boards;
    columns = DemoData.columns;
    tasks = DemoData.tasks;
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

import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import modalActions from "@redux/modal/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";

import { reorder, reorderTasks } from "@lib/helpers/reorder";
import Column from "../../../../components/ScrumBoard/Column/Column";
import { PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ParentContainer, Container, AddListButton } from "./Board.style";
import { filterSearchedComponents } from "@lib/helpers/searchTaskCard";
import BoardLayout from "./BoardLayout/BoardLayout";

function Board({
  currentBoard,
  openModal,
  boards,
  match,
  columns,
  moveColumnWatcher,
  tasks,
  moveTaskWatcher,
  ordered,
  containerHeight,
  withScrollableColumns = true,
  boardRenderWatcher,
}) {
  const statuses = useSelector((state) => state.filterData.statuses);
  const directOrgs = useSelector((state) => state.directOrgs.directOrgs);

  // Dựng board có id là status dựa trên giá trị field exec_status của direct_orgs
  useEffect(() => {
    if (boardRenderWatcher && statuses?.[0] && directOrgs?.[0]) {
      let exeStts = statuses.reduce((acc, stt) => {
        if (stt.id < 111) {
          return [...acc, stt];
        }
        return acc;
      }, []);
      boardRenderWatcher({ statuses: exeStts, data: directOrgs, field: "exec_status" });
    }
  }, [boardRenderWatcher, statuses, directOrgs]);

  const onDragEnd = ({ source, destination, type, draggableId }) => {
    // source= {
    //   droppableId: 'column-1',
    //   index: 0
    // }
    // destination= {
    //   droppableId: 'column-1',
    //   index: 1
    // }
    // type= "TYPE"
    // draggableId: 'task-1'

    // dropped nowhere
    if (!destination) return;
    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    // reordering column
    if (type === "COLUMN") {
      const columnOrdered = reorder(ordered, source.index, destination.index);
      moveColumnWatcher({
        board_id: "status",
        column_orders: columnOrdered,
      });
      return;
    }
    const updatedColumns = reorderTasks({ columns, source, destination, draggableId });
    const draggedTask = tasks[draggableId];
    const updatedTask = { ...draggedTask, column_id: destination.droppableId };
    const updatedTasks = { ...tasks, [updatedTask.id]: updatedTask };
    moveTaskWatcher({ columns: updatedColumns, tasks: updatedTasks });
  };

  const board = (
    <Droppable
      // isDropDisabled={true}
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
    >
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {/* // ---------------------------------------------------------------------------------  */}
          {/* render columned base on order in board info (redux) */}
          {/* // ---------------------------------------------------------------------------------  */}
          {ordered &&
            ordered.map((columnId, index) => {
              const column = columns[columnId];
              const tasksWithinColumn = column.task_orders.map((task_id) => tasks[task_id]);

              return (
                <Column
                  key={columnId}
                  index={index}
                  title={column.title}
                  column={column}
                  boardId={"status"}
                  tasks={tasksWithinColumn}
                  isScrollable={withScrollableColumns}
                />
              );
            })}
        </Container>
      )}
    </Droppable>
  );

  return (
    <BoardLayout currentBoard={currentBoard} boards={boards} match={match}>
      <DragDropContext onDragEnd={onDragEnd}>
        {containerHeight ? <ParentContainer height={containerHeight}>{board}</ParentContainer> : board}
      </DragDropContext>
    </BoardLayout>
  );
}

export default connect(
  (state, ownProps) => {
    return {
      ordered: state.scrumBoard.boards && state.scrumBoard.boards["status"] && state.scrumBoard.boards["status"].column_orders,
      state: state.scrumBoard,
      boards: state.scrumBoard.boards,
      currentBoard: state.scrumBoard.boards["status"],
      columns: filterSearchedComponents(state.scrumBoard.tasks, state.scrumBoard.columns, state.scrumBoard.searchText),
      tasks: state.scrumBoard.tasks,
    };
  },
  { ...scrumBoardActions, ...modalActions }
)(Board);

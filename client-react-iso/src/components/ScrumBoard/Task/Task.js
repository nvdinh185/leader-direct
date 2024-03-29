import React from "react";
import * as COMMON from "@constants/common";
import { connect } from "react-redux";
import scrumBoardActions from "@redux/scrumBoard/actions";
import drawerActions from "@redux/drawer/actions";
import { Container } from "./Task.style";
import TaskCard from "@components/ScrumBoard/Task/TaskCard/TaskCard";

class TaskItem extends React.PureComponent {
  render() {
    const { task, isDragging, isGroupedOver, provided, columnId, deleteTaskWatcher, openDrawer, closeDrawer, boardView } =
      this.props;
    return (
      <Container
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TaskCard
          task={task}
          showDrawer={() =>
            openDrawer({
              drawerType: boardView === "DA" ? COMMON.DRAWER_TASK_DETAIL_ASS : COMMON.DRAWER_TASK_DETAIL,
              drawerProps: {
                task: task,
                columnId: columnId,
              },
            })
          }
          onDelete={() => {
            deleteTaskWatcher({ task_id: task.id, column_id: columnId });
            closeDrawer();
          }}
        />
      </Container>
    );
  }
}

export default connect(null, { ...scrumBoardActions, ...drawerActions })(TaskItem);

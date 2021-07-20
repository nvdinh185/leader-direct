import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "../Task";
import { DropZone, Wrapper } from "./TaskList.style";

const InnerTaskList = React.memo((props) => {
  // ---------------------------------------------------------------------------------
  // TODO: Write task to render task base on list task of columns
  // ---------------------------------------------------------------------------------
  return props.tasks.map((task, index) => (
    <Draggable
      // Prop to disable drage and drop in column
      isDragDisabled={props.isDragDisabled}
      key={task.id}
      draggableId={task.id}
      index={index}
    >
      {(dragProvided, dragSnapshot) => (
        <TaskItem
          key={task.id}
          task={task}
          columnId={props.columnId}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

const InnerList = ({ dropProvided, tasks, columnId, isDragDisabled }) => (
  <DropZone ref={dropProvided.innerRef}>
    <Scrollbars style={{ height: 500 }} autoHide>
      <InnerTaskList isDragDisabled={isDragDisabled} tasks={tasks} columnId={columnId} />
      {dropProvided.placeholder}
    </Scrollbars>
  </DropZone>
);

const TaskList = ({
  ignoreContainerClipping,
  internalScroll,
  scrollContainerStyle,
  isDropDisabled,
  isCombineEnabled,
  listId,
  listType,
  style,
  column,
  tasks,
  title,
  ...props
}) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <InnerList
              isDragDisabled={props.isDragDisabled}
              tasks={tasks}
              title={title}
              columnId={column.id}
              dropProvided={dropProvided}
            />
          ) : (
            <InnerList title={title} tasks={tasks} columnId={column.id} dropProvided={dropProvided} />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
};
TaskList.defaultProps = {
  listId: "LIST",
};
export default TaskList;

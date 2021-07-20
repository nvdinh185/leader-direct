import React from "react";
import { connect } from "react-redux";
import drawerActions from "@redux/drawer/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { Draggable } from "react-beautiful-dnd";
import TaskList from "@components/ScrumBoard/Task/TaskList/TaskList";
import Title from "@components/ScrumBoard/Title";
import { Container, Header } from "./Column.style";

const Column = ({ title, column, tasks, index, boardId, isScrollable, isDragDisabled }) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
              {title}
            </Title>
          </Header>
          <TaskList
            isDragDisabled={isDragDisabled}
            listId={column.id}
            listType="QUOTE"
            column={column}
            tasks={tasks}
            internalScroll={isScrollable}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default connect(null, { ...scrumBoardActions, ...drawerActions })(Column);

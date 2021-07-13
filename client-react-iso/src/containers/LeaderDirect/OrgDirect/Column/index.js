import React from "react";
import { connect } from "react-redux";
import scrumBoardActions from "@redux/scrumBoard/actions";
import modalActions from "@redux/modal/actions";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import TaskList from "../TaskList";
import { Container, Header } from "./style";
import Title from "@components/scrumBoard/Title";

const Column = ({ title, column, tasks, index, isScrollable }) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
              {title}
            </Title>
            <PlusOutlined style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => {}} />
            <EditOutlined style={{ margin: "0 10px", cursor: "pointer" }} onClick={() => {}} />
          </Header>
          <TaskList listId={column.id} listType="QUOTE" column={column} tasks={tasks} internalScroll={isScrollable} />
        </Container>
      )}
    </Draggable>
  );
};

export default connect(null, { ...scrumBoardActions, ...modalActions })(Column);

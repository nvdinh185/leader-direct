import React from "react";
import { connect } from "react-redux";
import drawerActions from "@redux/drawer/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { Popconfirm, Popover } from "antd";
import { Draggable } from "react-beautiful-dnd";
import TaskList from "../Task/TaskList/TaskList";
import { IconSvg } from "@components/ScrumBoard/IconSvg/IconSvg";
import Title from "@components/ScrumBoard/Title";

import MoreIcon from "@assets/images/icon/16.svg";
import Plus from "@assets/images/icon/24.svg";
import { Container, Header, PlusIcon, MoreActionsWrapper } from "./Column.style";

const Column = ({ title, column, tasks, index, boardId, editColumn, deleteColumnWatcher, openDrawer, isScrollable }) => {
  const MoreActions = (
    <MoreActionsWrapper>
      <p onClick={() => editColumn(column)}>Rename Column</p>
      <p>
        <Popconfirm
          title="Are you sure delete this Column?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteColumnWatcher({ column_id: column.id, board_id: boardId })}
        >
          Delete Column
        </Popconfirm>
      </p>
    </MoreActionsWrapper>
  );
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
              {title}
            </Title>
            <PlusIcon
              src={Plus}
              onClick={() =>
                openDrawer({
                  drawerType: "CREATE_OR_EDIT_TASK",
                  drawerProps: { columnId: column.id },
                })
              }
            />
            <Popover placement="bottom" content={MoreActions} trigger="click">
              <IconSvg src={MoreIcon} border="none" padding="0" mr={"0"} />
            </Popover>
          </Header>
          <TaskList listId={column.id} listType="QUOTE" column={column} tasks={tasks} internalScroll={isScrollable} />
        </Container>
      )}
    </Draggable>
  );
};

export default connect(null, { ...scrumBoardActions, ...drawerActions })(Column);

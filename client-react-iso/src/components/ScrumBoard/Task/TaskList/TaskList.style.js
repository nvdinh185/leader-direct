import styled from "styled-components";
import { grid } from "@assets/styles/constants";

export const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? "#e6eaf899" : "inherit")};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};
  padding: 0 10px 10px;
  transition: background-color 0.1s ease, opacity 0.1s ease;
  user-select: none;
`;

export const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: 200px;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  margin-bottom: ${grid}px;
`;

export const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 180px);
`;

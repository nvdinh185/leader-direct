import styled from "styled-components";
import { grid } from "@assets/styles/constants";

export const Container = styled.div`
  box-sizing: border-box;
  margin: ${grid}px;
  display: flex;
  width: 100%;
  min-width: 280px;
  border-radius: 5px;
  overflow: hidden;
  background-color: rgba(242, 245, 253, 0.1);
  /* background-color: #f3f5fd; */
  flex-direction: column;
  &:last-child {
    margin-right: 0;
  }
  &:first-child {
    margin-left: 0;
  }
  .ant-form {
    margin-top: 5px;
  }
  .ant-form-item {
    margin-bottom: 5px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: background-color 0.1s ease;
  /* background-color: ${({ isDragging }) => (isDragging ? "#e6eaf8" : "transparent")}; */
  background-color: #e6eaf8;

  &:hover {
    background-color: #d6e1ff;
  }
`;

export const PlusIcon = styled.img`
  width: 25px;
  height: 25px;
  padding: 8px;
  border-radius: 9px;
  background-color: #e6eaf8;
  margin-right: 10px;
  cursor: pointer;
`;

export const MoreActionsWrapper = styled.div`
  cursor: pointer;
  p {
    font-size: 12px;
    color: #788195;
    text-transform: capitalize;
    font-weight: 500;
    padding: 5px;
  }
`;

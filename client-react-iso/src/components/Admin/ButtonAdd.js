import { Button } from "antd";
import styled from "styled-components";

/**
 * params {string} styledColor
 */
export const ButtonAdd = styled(Button)`
  background: ${(props) => (props.color ? props.color : props.className ? "" : "#87d068")};
  color: white;
  &:focus {
    background: ${(props) => (props.color ? props.color : props.className ? "" : "#87d068")};
    color: white;
    border: none;
  }
  &:hover {
    background: ${(props) => (props.color ? props.color : props.className ? "" : "#87d06899")};
    color: white;
    border: none;
  }
`;

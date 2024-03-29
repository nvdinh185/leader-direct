import styled from "styled-components";
import { colors, grid } from "@assets/styles/constants";

export default styled.h5`
  /* padding: ${grid}px; */
  margin: 0;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  font-size: 18px;
  color: #2d3446;
  font-family: "Roboto";
  font-weight: 500;
  &:focus {
    outline: 2px solid ${colors.purple};
    outline-offset: 2px;
  }
`;

import { Button } from "antd";
import styled from "styled-components";

/**
 * params {string} styledColor
 */
export const ButtonAdd = styled(Button)`
    background: ${(props) => (props.color ? props.color : "#87d068")};
    color: white;
    &:focus {
        background ${(props) => (props.color ? props.color : "#87d068")};
        color: white;
    }
    &:hover {
        background: ${(props) => (props.color ? props.color : "#87d06899")};
        color: white;
    }
`;

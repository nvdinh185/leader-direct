import React from "react";
import { Button } from "antd";
import styled from "styled-components";

export const ButtonAdd = styled(Button)`
    background #87d068;
    color: white;
    &:focus {
        background #87d068;
        color: white;
    }
    &:hover {
        background: #87d06899;
        color: white;
    }
`;

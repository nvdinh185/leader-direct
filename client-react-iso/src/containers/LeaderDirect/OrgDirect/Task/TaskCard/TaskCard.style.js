import styled from "styled-components";

export const TaskCardWrapper = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  width: 100%;

  &:hover {
    cursor: pointer;
    transform: translateY(-0.1rem);
    box-shadow: 0 0.1rem 1rem 0 rgb(33 40 50 / 25%);
    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

export const CardAttachment = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;
export const CardComment = styled.div`
  display: flex;
  align-items: center;
`;
export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 8px;
  color: #788195;
`;

export const CardTitle = styled.h3`
  font-size: 13px;
  color: #2d3446;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const CardIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: ${(props) => props.mr && props.mr}px;
`;

export const TaskCardTopMostDiv = styled.div`
  background: ${(props) => (props.bgColor ? props.bgColor : "linear-gradient(135deg, #49e8cc 0%, #ffd642 100%)")};
  height: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

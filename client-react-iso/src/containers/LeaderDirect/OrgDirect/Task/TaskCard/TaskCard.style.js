import styled from "styled-components";

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
  margin-bottom: 5px;
`;

export const CardIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: ${(props) => props.mr && props.mr}px;
`;

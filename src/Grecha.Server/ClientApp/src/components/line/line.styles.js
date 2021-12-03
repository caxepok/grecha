import styled from "styled-components";

export const Carts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
  margin-left: -${(p) => p.theme.spacing.xlarge};
  margin-top: -60px;
  padding-top: 100px;
  min-height: 155px;
`;

export const Crane = styled.div`
  position: absolute;
  right: 0;
  width: 173px;
  height: 150px;
  bottom: 15px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  margin-top: -36px;
`;

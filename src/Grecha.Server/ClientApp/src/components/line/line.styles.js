import styled, { keyframes } from "styled-components";

export const Carts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
  margin-left: -${(p) => p.theme.spacing.xlarge};
  margin-top: -60px;
  margin-bottom: -20px;
  padding-bottom: 20px;
  padding-top: 100px;
  min-height: 155px;
`;

export const Crane = styled.div`
  position: absolute;
  right: 0;
  width: 173px;
  height: 150px;
  bottom: 35px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  margin-top: -36px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const Photo = styled.div`
  margin-top: -40px;
  margin-left: 30px;
  width: 230px;
  position: relative;

  > img {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: ${(p) => p.theme.borderRadius.card};
    animation: ${fadeIn} 1s;
  }
`;

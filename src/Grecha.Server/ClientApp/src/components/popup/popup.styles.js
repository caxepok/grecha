import styled from "styled-components";

export const Cover = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000033;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 50px;
`;

export const Window = styled.div`
  border-radius: ${(p) => p.theme.borderRadius.card};
  box-shadow: ${(p) => p.theme.shadows.cardHover}, 0 0 0 1px ${(p) => p.theme.colors.quarternary}66;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #ffffff;
  z-index: 100;
  user-select: none;
  width: 60%;
  position: relative;
  max-height: 100%;

  &:focus {
    z-index: 102;
  }
`;

export const Header = styled.div`
  ${(p) => p.theme.typography.title.h4};
  align-items: center;
  min-height: 40px;
  margin-top: -5px;
  display: flex;
  padding: ${(p) => p.theme.spacing.xlarge};
  margin-bottom: 0;
  padding-right: 40px;
`;

export const Body = styled.div`
  overflow: scroll;
  flex-grow: 1;
  padding: ${(p) => p.theme.spacing.xlarge};
  padding-top: 0;
`;

export const Button = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.colors.secondary};
  border-radius: 3px;
  cursor: pointer;
  font-weight: 400;
  font-size: 30px;
  line-height: 30px;

  &:hover {
    color: ${(p) => p.theme.colors.accent};
  }
`;

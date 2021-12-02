import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  border-radius: ${(p) => p.theme.borderRadius.card};
  box-shadow: ${(p) => p.theme.shadows.cardHover}, 0 0 0 1px ${(p) => p.theme.colors.quarternary}66;
  padding: ${(p) => (p.isFixed ? p.theme.spacing.large : p.theme.spacing.medium)};
  gap: ${(p) => p.theme.spacing.large};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #ffffff;
  z-index: ${(p) => (p.isFixed ? 101 : 100)};
  opacity: 0;
  transition: opacity 0.1s, width 0.2s, height 0.2s, padding 0.2s;
  user-select: none;
  transform: translate(-50%, -50%);
  width: ${(p) => (p.isFixed ? 400 : 200)}px;
  height: ${(p) => (p.isFixed ? 280 : 180)}px;

  &:focus {
    z-index: 102;
  }
`;

export const Header = styled.div`
  ${(p) => p.theme.typography.title.h4};
  padding-right: 40px;
  align-items: center;
  min-height: 40px;
  margin-top: -5px;
  display: ${(p) => (p.isFixed ? "flex" : "none")};
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

import styled from "styled-components";

export const Wrapper = styled.span`
  color: ${(p) => p.theme.colors.accent};
  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${(p) => p.theme.colors.accent}66;
  font-weight: ${(p) => (p.isPlaceholder ? 400 : 700)};
`;

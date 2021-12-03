import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Body = styled.tbody``;

export const Head = styled.thead`
  font-size: 12px;
  font-weight: 700;
`;

export const Row = styled.tr`
  font-size: ${(p) => p.theme.typography.fontSize};
  color: ${(p) => p.theme.colors.primary};
  position: relative;
  border-radius: 2px;

  &:nth-child(2n) {
    background: ${(p) => p.theme.colors.background}77;
  }
`;

export const Cell = styled.td`
  padding: ${(p) => p.theme.spacing.medium};
  cursor: default;

  ${Head} & {
    padding-top: 0;
    border-bottom: 1px solid ${(p) => p.theme.colors.secondary}22;
  }
`;

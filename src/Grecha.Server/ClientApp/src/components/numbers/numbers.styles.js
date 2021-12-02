import styled from "styled-components";
import { colors } from "../../consts";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

export const Number = styled.span`
  ${(p) => p.theme.typography.title.h2};
  color: ${(p) => colors[p.type]};

  &:before {
    content: "/";
    display: inline-block;
    margin: 0 0.3em;
    color: ${(p) => p.theme.colors.quarternary};
    font-weight: 400;
  }

  &:first-child:before {
    display: none;
  }
`;

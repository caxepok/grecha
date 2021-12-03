import React from "react";
import styled, { css } from "styled-components";

export const Button = React.memo((props) => {
  return <Block {...props} type={"button"} />;
});

const Block = styled.button(
  ({ theme: { colors, spacing, typography, borderRadius } }) => css`
    padding: ${spacing.small} ${spacing.large};
    appearance: none;
    margin: 0;
    border: none;
    font-size: ${typography.fontSize};
    line-height: ${typography.lineHeight};
    font-weight: 700;
    font-family: inherit;
    border-radius: ${borderRadius.button};
    background: ${colors.accent};
    color: ${colors.white};
    cursor: pointer;
    box-shadow: inset 0 1px 0 0 #ffffff44, 0 2px 0 0 #00000044, 0 2px 0 0 ${colors.accent};
    background-image: linear-gradient(to bottom, #ffffff22, #ffffff00);
    transition: box-shadow, transform;
    transition-duration: 0.1s;

    &:active {
      transform: translateY(2px);
      box-shadow: inset 0 1px 0 0 #00000033, 0 0 0 0 #00000000, 0 0 0 0 ${colors.accent};
    }
  `,
);

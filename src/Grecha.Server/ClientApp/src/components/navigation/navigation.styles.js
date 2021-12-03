import styled, { css } from "styled-components";

export const LinkWrapper = styled.span(
  ({ theme: { spacing, colors, typography } }) => css`
    font-size: ${typography.title.h4.fontSize};
    color: ${colors.white};
    font-weight: 700;
    display: block;
    padding: ${spacing.large} ${spacing.xlarge};
    border-top: 1px solid ${colors.accent}22;
    background: ${colors.accent};

    a& {
      color: ${colors.accent};
      text-decoration: none;
      background: transparent;
    }
  `,
);

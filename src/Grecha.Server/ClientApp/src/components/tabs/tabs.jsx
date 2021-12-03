import React, { useMemo } from "react";
import { Redirect, useRouteMatch } from "react-router";
import { createPathURL } from "../nav-list/nav-list.helpers";
import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Tabs = React.memo((props) => {
  const { items, param } = props;

  const match = useRouteMatch();
  if (items && items.length && !match.params[param]) {
    return <Redirect to={createPathURL(match, { [param]: items[0].id })} />;
  }

  return (
    <Wrapper>
      {items &&
        items.map((item) => (
          <Link key={item.id} id={item.id} param={param}>
            {item.label}
          </Link>
        ))}
    </Wrapper>
  );
});

const Wrapper = styled.div(
  ({ theme: { spacing, colors, borderRadius, typography } }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: ${typography.fontSize};
    line-height: ${typography.lineHeight};

    > a,
    > span {
      color: ${colors.secondary};
      padding: ${spacing.medium};
      text-decoration: none;
      border: 1px solid ${colors.secondary}66;
      margin-left: -1px;
      font-weight: 500;

      &:first-child {
        border-top-left-radius: ${borderRadius.button};
        border-bottom-left-radius: ${borderRadius.button};
      }

      &:last-child {
        border-top-right-radius: ${borderRadius.button};
        border-bottom-right-radius: ${borderRadius.button};
      }
    }

    > span {
      color: ${colors.primary};
      background-color: ${colors.secondary}22;
    }
  `,
);

const Link = React.memo((props) => {
  const { id, children, param } = props;
  const match = useRouteMatch();

  const elementProps = useMemo(
    () => ({
      to: String(id) === match.params[param] ? undefined : createPathURL(match, { [param]: id }),
      as: String(id) === match.params[param] ? undefined : RouterLink,
    }),
    [id, match, param],
  );

  return <Item {...elementProps}>{children}</Item>;
});

const Item = styled.span``;

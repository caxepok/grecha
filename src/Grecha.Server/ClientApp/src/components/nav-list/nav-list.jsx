import React, { useMemo } from "react";
import { Redirect, useRouteMatch } from "react-router";
import { createPathURL } from "./nav-list.helpers";
import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const NavList = React.memo((props) => {
  const { items, title } = props;

  const match = useRouteMatch();
  if (items && items.length && !match.params.id) {
    return <Redirect to={createPathURL(match, { id: items[0].id })} />;
  }

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <List>
        {items &&
          items.map((item) => (
            <Link key={item.id} id={item.id}>
              {item.name}
            </Link>
          ))}
      </List>
    </Wrapper>
  );
});

const Link = React.memo((props) => {
  const { id, children } = props;
  const match = useRouteMatch();

  const elementProps = useMemo(
    () => ({
      to: String(id) === match.params.id ? undefined : createPathURL(match, { id }),
      as: String(id) === match.params.id ? undefined : RouterLink,
    }),
    [id, match],
  );

  return <Item {...elementProps}>{children}</Item>;
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const Title = styled.h3(
  ({ theme: { typography, spacing, colors } }) => css`
    font-size: ${typography.title.h3.fontSize};
    line-height: ${typography.title.h3.lineHeight};
    font-weight: ${typography.title.h3.fontWeight};
    margin: 0 0 ${spacing.large};
    color: ${colors.primary};
  `,
);

const List = styled.div(
  ({ theme: { spacing, colors } }) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: stretch;

    > a,
    > span {
      color: ${colors.secondary};
      padding: ${spacing.medium} 0;
      text-decoration: none;
      width: 100%;

      &:not(:last-child) {
        border-bottom: 1px solid ${colors.secondary}44;
      }
    }

    > span {
      font-weight: 700;
      color: ${colors.primary};
    }
  `,
);

const Item = styled.span``;

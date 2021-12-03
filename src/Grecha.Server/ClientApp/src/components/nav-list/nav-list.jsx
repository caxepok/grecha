import React, { useMemo } from "react";
import { useRouteMatch } from "react-router";
import { createPathURL } from "./nav-list.helpers";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const NavList = React.memo((props) => {
  const { items } = props;

  return (
    <div>
      {items.map((item) => (
        <Link key={item.id} id={item.id}>
          {item.name}
        </Link>
      ))}
    </div>
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

  return <Block {...elementProps}>{children}</Block>;
});

const Block = styled.span``;

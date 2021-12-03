import React, { useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import * as Markup from "./navigation.styles";
import { Title } from "../layout/page.styles";
import styled, { css } from "styled-components";
import { Layout } from "../layout";

const Link = React.memo((props) => {
  const { path, children } = props;
  const { page } = useParams();

  const elementProps = useMemo(
    () => ({ to: page === path ? undefined : `/${path}`, as: page === path ? undefined : RouterLink }),
    [page, path],
  );

  return <Markup.LinkWrapper {...elementProps}>{children}</Markup.LinkWrapper>;
});

export const Navigation = React.memo(() => {
  return (
    <Layout.Column sizes={["auto", "auto", 1]}>
      <Title>
        <Logo>
          <img src="/logo.png" alt={"Греча"} />
          Высший сорт
        </Logo>
      </Title>
      <Layout.Card>
        <Wrapper>
          <Link path="process">Процесс</Link>
          <Link path="analytics">Аналитика</Link>
          <Link path="settings">Настройка</Link>
        </Wrapper>
      </Layout.Card>
      <span />
    </Layout.Column>
  );
});

const Wrapper = styled.div(
  ({ theme: { spacing, borderRadius } }) => css`
    flex-grow: 1;
    margin: -${spacing.xlarge};
    border-radius: ${borderRadius.card};
    overflow: hidden;
  `,
);

const Logo = styled.span`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 55px;
  position: relative;
  justify-content: left;
  flex-grow: 1;

  > img {
    position: absolute;
    width: 55px;
    left: -10px;
  }
`;

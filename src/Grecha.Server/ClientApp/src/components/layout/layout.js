import React from "react";
import * as CardMarkup from "./card.styles";
import * as PageMarkup from "./page.styles";
import { ReactComponent as BackArrow } from "../../assets/shevron.svg";
import styled from "styled-components";

const Card = React.memo(
  React.forwardRef((props, ref) => {
    const { title, children, placeholder } = props;

    return (
      <CardMarkup.Wrapper ref={ref}>
        {title && <CardMarkup.Title>{title}</CardMarkup.Title>}
        <CardMarkup.Content>{children}</CardMarkup.Content>
        {placeholder && <CardMarkup.Placeholder>{placeholder}</CardMarkup.Placeholder>}
      </CardMarkup.Wrapper>
    );
  }),
);

const Page = React.memo((props) => {
  const { title, children, backTo } = props;
  return (
    <PageMarkup.Wrapper>
      {backTo && (
        <PageMarkup.BackButton to={backTo}>
          <BackArrow />
        </PageMarkup.BackButton>
      )}
      {title && <PageMarkup.Title>{title}</PageMarkup.Title>}
      <PageMarkup.Content>{children}</PageMarkup.Content>
    </PageMarkup.Wrapper>
  );
});

const Row = styled.div`
  display: grid;
  flex-basis: 100%;
  gap: ${(p) => p.theme.spacing.xlarge};
  grid-template-columns: ${(p) =>
    (p.sizes
      ? p.sizes.map((s) => (typeof s === "number" ? `${s}fr` : s))
      : [...new Array(p.count || 1)].map((_) => "1fr")
    ).join(" ")};
`;

const Column = styled.div`
  display: grid;
  flex-basis: 100%;
  grid-template-rows: ${(p) =>
    (p.sizes
      ? p.sizes.map((s) => (typeof s === "number" ? `${s}fr` : s))
      : [...new Array(p.count || 1)].map((_) => "1fr")
    ).join(" ")};
  gap: ${(p) => p.theme.spacing.xlarge};
`;

const Layout = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 100%;
  position: absolute;
  padding: ${(p) => p.theme.spacing.xlarge};
  background: ${(p) => p.theme.colors.background};

  > * {
    flex-basis: 100%;
  }
`;

Layout.Card = Card;
Layout.Page = Page;
Layout.Row = Row;
Layout.Column = Column;

export { Layout };

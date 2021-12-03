import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: ${(p) => p.theme.borderRadius.card};
  background: #fff;
  padding: ${(p) => p.theme.spacing.xlarge};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: ${(p) => p.theme.spacing.xlarge};
  box-shadow: ${(p) => p.theme.shadows.card};
  text-decoration: none;
  color: ${(p) => p.theme.colors.secondary};
  transition: box-shadow 0.1s, transform 0.1s;
  position: relative;
`;

export const Title = styled.h3`
  margin: -2px 0 0 0;
  text-align: left;
  ${(p) => p.theme.typography.title.h3};
  color: ${(p) => p.theme.colors.primary};
  position: relative;

  > a {
    color: ${(p) => p.theme.colors.accent};
    text-decoration: none;
    border-bottom: 1px solid ${(p) => p.theme.colors.accent}44;
  }
`;

export const Content = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: ${(p) => p.align || "flex-start"};
`;

export const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ffffff66;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(p) => p.theme.borderRadius.card};
`;

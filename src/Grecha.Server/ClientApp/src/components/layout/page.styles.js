import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: ${(p) => p.theme.spacing.xlarge};
  text-decoration: none;
  color: ${(p) => p.theme.colors.secondary};
  transition: box-shadow 0.1s, transform 0.1s;
  position: relative;
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0;
  padding: 10px 5px;
  display: flex;
  justify-content: flex-start;
  ${(p) => p.theme.typography.title.h2};
  color: ${(p) => p.theme.colors.primary};
`;

export const Header = styled.div`
  display: flex;
  gap: 30px;
`;

export const Content = styled.div`
  flex-basis: 100%;
  display: flex;
`;

export const BackButton = styled(NavLink)`
  width: 32px;
  height: 32px;
  fill: ${(p) => p.theme.colors.accent};
  position: absolute;
  left: ${(p) => p.theme.spacing.xlarge};
  top: ${(p) => p.theme.spacing.xlarge};
`;

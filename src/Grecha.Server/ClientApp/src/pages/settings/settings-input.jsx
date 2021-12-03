import React, { useCallback } from "react";
import styled, { css } from "styled-components";

export const SettingsInput = React.memo((props) => {
  const { label, name, value, onChange } = props;

  const handleChange = useCallback((e) => onChange(name, e.target.value), [onChange, name]);

  return (
    <Block>
      <Label>{label}</Label>
      <Input value={value} onChange={handleChange} />%
    </Block>
  );
});

const Block = styled.label(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.medium};
    font-size: ${theme.typography.fontSize};
  `,
);

const Label = styled.span`
  font-weight: bold;
`;

const Input = styled.input`
  text-align: right;
  width: 50px;
  font-family: inherit;
  font-size: inherit;
  padding: 4px 8px;
`;

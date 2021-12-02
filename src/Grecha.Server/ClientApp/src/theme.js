import { css } from "styled-components";

class CSSUnit {
  constructor(value, unit = "px") {
    this.val = value;
    this.unit = unit;
  }

  valueOf() {
    return this.val;
  }

  toString() {
    return `${this.val}${this.unit}`;
  }
}

const theme = {
  colors: {
    background: "#F2F2F2",
    accent: "#843FB5",
    primary: "#222222",
    secondary: "#555555",
    tertiary: "#999999",
    quarternary: "#CCCCCC",
  },
  typography: {
    fontSize: new CSSUnit(13),
    lineHeight: new CSSUnit(18),
    title: {
      h2: css`
        font-size: 23px;
        line-height: 26px;
        font-weight: 700;
      `,
      h3: css`
        font-size: 18px;
        line-height: 22px;
        font-weight: 700;
      `,
      h4: css`
        font-size: 15px;
        line-height: 16px;
        font-weight: 700;
      `,
    },
  },
  borderRadius: {
    card: new CSSUnit(6),
  },
  spacing: {
    xsmall: new CSSUnit(2),
    small: new CSSUnit(4),
    medium: new CSSUnit(8),
    large: new CSSUnit(12),
    xlarge: new CSSUnit(20),
    xxlarge: new CSSUnit(30),
  },
  shadows: {
    card: "0 1px 10px -4px #00000019",
    cardHover: "0 5px 14px -6px #0000004C",
    cardActive: "0 0 0 1px #0000000A",
  },
};

export default theme;

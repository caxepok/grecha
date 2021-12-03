import React from "react";
import * as Markup from "./popup.styles";

export const Popup = React.memo((props) => {
  const { children, title, onClose } = props;

  return (
    <Markup.Cover>
      <Markup.Window>
        <Markup.Header>
          {title}
          <Markup.Button onClick={onClose}>×</Markup.Button>
        </Markup.Header>
        <Markup.Body>{children}</Markup.Body>
      </Markup.Window>
    </Markup.Cover>
  );
});

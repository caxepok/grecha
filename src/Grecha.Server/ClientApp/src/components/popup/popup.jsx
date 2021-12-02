import React, { useCallback, useEffect, useRef, useState } from "react";
import useEventListener from "@use-it/event-listener";
import * as Markup from "./popup.styles";

export const Popup = React.memo((props) => {
  const { triggerRef, children, title } = props;
  const [isVisible, setVisibility] = useState();
  const [isFixed, setFixed] = useState();
  const [dragParams, setDragParams] = useState();
  const [style, setStyle] = useState();
  useEffect(() => setVisibility(false), []);
  const blockRef = useRef(null);

  const handleClick = useCallback(() => setFixed(true), []);
  useEventListener("click", handleClick, !isFixed ? blockRef.current : null);

  const handleMouseOver = useCallback(
    (e) => {
      setVisibility(
        (triggerRef.current && triggerRef.current.contains(e.target)) ||
          (blockRef.current && blockRef.current.contains(e.target)),
      );
    },
    [triggerRef, blockRef],
  );
  useEventListener("mousemove", handleMouseOver, !isFixed ? document : null);

  const handleMouseDown = useCallback(
    (e) => {
      if (!style) return;
      if (e.which !== 1) return;

      setDragParams({
        left: style.left,
        top: style.top,
        x: e.pageX,
        y: e.pageY,
      });
    },
    [style],
  );
  const handleMouseMove = useCallback(
    (e) => {
      if (!dragParams) {
        return;
      }
      setStyle({
        left: dragParams.left + e.pageX - dragParams.x,
        top: dragParams.top + e.pageY - dragParams.y,
        opacity: 1,
      });
    },
    [dragParams],
  );
  const handleMouseUp = useCallback(() => setDragParams(undefined), []);
  useEventListener("mousedown", handleMouseDown, isFixed ? blockRef.current : null);
  useEventListener("mousemove", handleMouseMove, dragParams ? document.body : null);
  useEventListener("mouseup", handleMouseUp, dragParams ? document.body : null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setStyle({
        top: triggerRect.top + triggerRect.height / 2,
        left: triggerRect.left + triggerRect.width / 2,
        opacity: 1,
      });
    } else {
      !isFixed && setStyle(undefined);
    }
  }, [isVisible, isFixed, triggerRef]);

  useEffect(() => {
    if (isFixed === false) {
      setVisibility(false);
    }
  }, [isFixed]);

  return isVisible || isFixed ? (
    <Markup.Wrapper ref={blockRef} style={style} isFixed={isFixed} tabIndex={0}>
      <Markup.Header isFixed={isFixed}>
        {title}
        <Markup.Button onClick={() => setFixed((value) => !value)}>×</Markup.Button>
      </Markup.Header>
      {children}
    </Markup.Wrapper>
  ) : null;
});

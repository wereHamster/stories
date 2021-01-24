import * as React from "react";
import styled from "styled-components";
import { X } from 'react-feather'

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  color: white;

  display: grid;
  place-items: center;
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: () => void;
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { onClose, children, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest}>
      <div style={{ maxHeight: "85%", width: "100%" }}>{children}</div>

      <div style={{ position: 'absolute', top: 12, right: 12, cursor: "pointer" }} onClick={onClose}>
        <X />
      </div>
    </Root>
  );
}

export default React.forwardRef(Lightbox)

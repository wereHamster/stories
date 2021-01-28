import * as React from "react";
import styled from "styled-components";
import { X } from 'react-feather'
import * as ReactDOM from 'react-dom'

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  color: white;

  display: grid;
  grid-template-rows: 64px 1fr min-content;
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: () => void;
  caption?: React.ReactNode;
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { onClose, caption, children, ...rest } = props;

  if (typeof document === 'undefined') {
    return <Root ref={ref as any} {...rest}>
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
      <div style={{ marginRight: 12, cursor: 'pointer' }} onClick={onClose}>
        <X />
      </div>
    </div>

    <div style={{ placeSelf: "stretch", position: "relative" }}>{children}</div>

    <div style={{ margin: "24px 0 24px", textAlign: "center", alignSelf: "end", opacity: 0.7, fontSize: "0.9em", fontStyle: "italic" }}>
      {caption}
    </div>      
  </Root>
  } else {


  return ReactDOM.createPortal(
    (
      <Root ref={ref as any} {...rest}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
          <div style={{ marginRight: 12, cursor: 'pointer' }} onClick={onClose}>
            <X />
          </div>
        </div>
  
        <div style={{ placeSelf: "stretch", position: "relative" }}>{children}</div>
  
        <div style={{ margin: "24px 0 24px", textAlign: "center", alignSelf: "end", opacity: 0.7, fontSize: "0.9em", fontStyle: "italic" }}>
          {caption}
        </div>      
      </Root>
    ),
    document.body
  );
    }
}

export default React.forwardRef(Lightbox)

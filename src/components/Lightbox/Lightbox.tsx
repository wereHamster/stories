import * as React from "react";
import styled from "styled-components";
import * as Icons from 'react-feather'
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

  next?: any;
  prev?: any;
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { onClose, caption, children, ...rest } = props;

  const el = (
    <Root ref={ref as any} {...rest}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
        <div style={{ marginRight: 12, cursor: 'pointer' }} onClick={onClose}>
          <Icons.X />
        </div>
      </div>

      <div style={{ placeSelf: "stretch", position: "relative" }}>
        {children}

        <div style={{ position: 'absolute', paddingRight: 32, left: 0, top: 0, bottom: 0, width: 80, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <Icons.ArrowLeft />
        </div>

        <div style={{ position: 'absolute', paddingLeft: 32, right: 0, top: 0, bottom: 0, width: 80, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <Icons.ArrowRight />
        </div>
      </div>

      <div style={{ margin: "24px 0 24px", textAlign: "center", alignSelf: "end", opacity: 0.7, fontSize: "0.9em", fontStyle: "italic" }}>
        {caption}
      </div>      
    </Root>
  )

  if (typeof document === 'undefined') {
    return el
  } else {
    return ReactDOM.createPortal(el, document.body);
  }
}

export default React.forwardRef(Lightbox)

import * as React from "react";
import * as Icons from 'react-feather'
import * as ReactDOM from 'react-dom'

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = 'div'

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: () => void;
  caption?: React.ReactNode;

  prev?: () => {};
  next?: () => {};
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { onClose, caption, prev, next, children, ...rest } = props;

  const el = (
    <Root ref={ref as any} style={{
      position: 'fixed',
      inset: 0,
      background: 'black',
      color: 'white',
      display: 'grid',
      gridTemplateRows: '64px 1fr min-content'
    }} {...rest}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
        <div style={{ marginRight: 12, cursor: 'pointer' }} onClick={onClose}>
          <Icons.X />
        </div>
      </div>

      <div style={{ placeSelf: "stretch", position: "relative" }}>
        {children}

        <div onClick={prev} style={{ zIndex: 2, position: 'absolute', paddingRight: 32, left: 0, top: 0, bottom: 0, width: 80, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <Icons.ArrowLeft />
        </div>

        <div onClick={next} style={{ zIndex: 2, position: 'absolute', paddingLeft: 32, right: 0, top: 0, bottom: 0, width: 80, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
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

import * as React from "react";
import * as Icons from "react-feather";
import * as ReactDOM from "react-dom";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: () => void;
  caption?: React.ReactNode;

  prev?: () => void;
  next?: () => void;
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { onClose, caption, prev, next, children, ...rest } = props;

  React.useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        onClose?.();
      } else if (ev.key === "ArrowLeft") {
        prev?.();
      } else if (ev.key === "ArrowRight") {
        next?.();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, prev, next]);

  const el = (
    <Root
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
      {...rest}
    >
      <div style={{ height: 64, flex: "64px 0 0", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ marginRight: 12, cursor: "pointer" }} onClick={onClose}>
          <Icons.X />
        </div>
      </div>

      <div style={{ flexGrow: 1, position: "relative", userSelect: "none" }}>
        {children}

        <div
          onClick={prev}
          style={{
            zIndex: 2,
            position: "absolute",
            paddingRight: 32,
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.ArrowLeft />
        </div>

        <div
          onClick={next}
          style={{
            zIndex: 2,
            position: "absolute",
            paddingLeft: 32,
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.ArrowRight />
        </div>
      </div>

      <div
        style={{
          margin: "24px 0 24px",
          textAlign: "center",
          width: "100%",
          opacity: 0.7,
          fontSize: "0.9em",
          fontStyle: "italic",
        }}
      >
        {caption}
      </div>
    </Root>
  );

  if (typeof document === "undefined") {
    return el;
  } else {
    return ReactDOM.createPortal(el, document.body);
  }
}

export default React.forwardRef(Lightbox);

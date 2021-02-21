import * as React from "react";
import * as Icons from "react-feather";
import * as ReactDOM from "react-dom";
import { css, cx } from "@linaria/core";

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
  const { onClose, caption, prev, next, className, children, ...rest } = props;

  /*
   * Attach event handlers to 'document' to handle keyboard shortcuts.
   */
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
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      <div className={classes.top}>
        <div className={classes.close} onClick={onClose}>
          <Icons.X />
        </div>
      </div>

      <div className={classes.center}>
        {children}

        <div onClick={prev} className={classes.prev}>
          <Icons.ArrowLeft />
        </div>

        <div onClick={next} className={classes.next}>
          <Icons.ArrowRight />
        </div>
      </div>

      <div className={classes.caption}>{caption}</div>
    </Root>
  );

  if (typeof document === "undefined") {
    return el;
  } else {
    return ReactDOM.createPortal(el, document.body);
  }
}

export default React.forwardRef(Lightbox);

const classes = {
  root: css`
    position: fixed;
    inset: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: black;
    color: white;
    display: flex;
    flex-direction: column;
  `,

  top: css`
    height: 64px;
    flex: 64px 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,

  close: css`
    padding: 12px;
    cursor: pointer;

    svg {
      display: block;
    }
  `,

  center: css`
    flex-grow: 1;
    position: relative;
    user-select: none;
  `,

  prev: css`
    z-index: 2;
    position: absolute;
    padding-right: 32px;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  next: css`
    z-index: 2;
    position: absolute;
    padding-left: 32px;
    right: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,

  caption: css`
    margin: 24px 0;
    text-align: center;
    width: 100%;
    opacity: 0.7;
    font-size: 0.9em;
    font-style: italic;
  `,
};

import { css, cx } from "@linaria/core";
import Link from "next/link";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "a";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Brandmark(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { className, ...rest } = props;

  return (
    <Link href="/" passHref>
      <Root ref={ref} className={cx(classes.root, className)} {...rest}>
        <div>Stories</div>
        <div>by Tomáš Čarnecký</div>
      </Root>
    </Link>
  );
}

export default React.forwardRef(Brandmark);

const classes = {
  root: css`
    display: block;
    text-decoration: none;

    font-size: clamp(32px, 3.5vw, 80px);
    line-height: 1;

    padding: 0.5em 0.7em;

    background: black;
    color: white;

    & > *:first-child {
      font-weight: 900;
      letter-spacing: 0.11em;
    }
    & > *:last-child {
      font-size: 0.45em;

      padding-top: 0.2em;
      opacity: 0.75;
    }
  `,
};

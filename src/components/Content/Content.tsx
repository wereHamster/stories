import * as React from "react";
import { css, cx } from '@linaria/core';

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Content(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, className, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      {children}
    </Root>
  );
}

export default React.forwardRef(Content)

const classes = {
  root: css`
    display: grid;

    grid-template-columns: [le] 1rem [lex lc] 1fr [rc rex] 1rem [re];
    @media (min-width: calc(36rem + 2rem)) {
      grid-template-columns: [le] 1fr 1rem [lex] minmax(0, 12rem) [lc] 36rem [rc] minmax(0, 12rem) [rex] 1rem 1fr [re];
    }

    .wp {
      grid-column: lex / rex;
    }

    .fw {
      grid-column: le / re;
    }

    & > *:not(.wp):not(.fw) {
      grid-column: lc / rc;
    }

    & > h2 {
      margin: 3em 0 1em;
    }

    & > p {
      margin: 1em 0;
    }
  `
};

import * as React from "react";
import { css, cx } from "@linaria/core";

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

export default React.forwardRef(Content);

const classes = {
  root: css`
    display: grid;

    /*
     * The width of the main (center) column. Choose so that lines
     * of text are neither too long nor too short.
     */
    --center-column: 36rem;

    /*
     * The (max) width of the extended columns
     */
    --extended-column: 12rem;

    grid-template-columns:
      [le]
        max(1rem, env(safe-area-inset-left))
      [lex lc]
        1fr
      [rc rex]
        max(1rem, env(safe-area-inset-right))
      [re];

    /*
     * Can't use var() nor env() in media queries :(
     *
     * > (min-width: calc(var(--center-column) + max(1rem, env(safe-area-inset-left)) + max(1rem, env(safe-area-inset-right))))
     */
    @media (min-width: calc(36rem + 2rem)) {
      grid-template-columns:
        [le]
          1fr
          max(1rem, env(safe-area-inset-left))
        [lex]
          minmax(0, var(--extended-column))
        [lc]
          var(--center-column)
        [rc]
          minmax(0, var(--extended-column))
        [rex]
          max(1rem, env(safe-area-inset-right))
          1fr
        [re];
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
      margin: .5em 0;
    }
  `,
};

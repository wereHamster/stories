import * as React from "react";
import { css, cx } from "@linaria/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Group(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, className, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const { style, span = [], aspectRatio, ...props } = child.props;

        /*
         * This is to support older stories which still use inline styles in groups.
         * These stories should be migrated to the new syntax using span / aspectRatio
         * (once that API stabilizes).
         */
        if (style) {
          return React.createElement<any>(child.type, {
            ...props,
            style,
            captionPlacement: "overlay",
            layout: "fill",
          });
        }

        return (
          <div
            className={cx(classes.span[span[0] ?? 12], span[1] && classes.span[`md:${span[1]}`])}
            style={{ display: "grid", position: "relative" }}
          >
            <div style={{ gridArea: "1 / 1 / 1 / 1", height: 0, paddingBottom: `calc(100% / ${aspectRatio ?? 1})` }} />
            {React.createElement<any>(child.type, {
              ...props,
              style: { gridArea: "1 / 1 / 1 / 1", placeSelf: "stretch" },
              captionPlacement: "overlay",
              layout: "fill",
            })}
          </div>
        );
      })}
    </Root>
  );
}

export default React.forwardRef(Group);

const classes = {
  root: css`
    display: grid;

    grid-template-columns: repeat(12, 1fr);
    grid-gap: 8px;

    justify-items: stretch;
    align-items: stretch;
  `,

  span: {
    [`1`]: css`
      grid-column-end: span 1;
    `,
    [`3`]: css`
      grid-column-end: span 3;
    `,
    [`4`]: css`
      grid-column-end: span 4;
    `,
    [`5`]: css`
      grid-column-end: span 5;
    `,
    [`6`]: css`
      grid-column-end: span 6;
    `,
    [`12`]: css`
      grid-column-end: span 12;
    `,

    [`md:1`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 1;
      }
    `,
    [`md:3`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 3;
      }
    `,
    [`md:4`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 4;
      }
    `,
    [`md:5`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 5;
      }
    `,
    [`md:6`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 6;
      }
    `,
    [`md:12`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 12;
      }
    `,
  },
};

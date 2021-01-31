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
    <Root ref={ref} className={cx(className, "wp", classes.root)} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement<any>(child, {
          captionPlacement: "overlay",
          layout: "fill",
        });
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
};

import * as React from "react";
import styled from "styled-components";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  display: grid;

  grid-template-columns: repeat(12, 1fr);
  grid-gap: 8px;

  justify-items: stretch;
  align-items: stretch;
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Group(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest} className="wp">
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child
        }

        return React.cloneElement<any>(child, { captionPlacement: "overlay", layout: "fill" })
      })
      }
    </Root>
  );
}

export default React.forwardRef(Group)

import * as React from "react";
import styled from "styled-components";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  display: grid;

  grid-template-columns: [le] 16px [lex lc] 1fr [rc rex] 16px [re];

  @media (min-width: 48rem) {
    grid-template-columns: [le] 24px [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] 24px [re];
  }

  @media (min-width: 72rem) {
    grid-template-columns: [le] 1fr 24px [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] 24px 1fr [re];
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
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Content(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest}>
      {children}
    </Root>
  );
}

export default React.forwardRef(Content)

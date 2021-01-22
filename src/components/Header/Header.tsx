import * as React from "react";
import styled from "styled-components";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 70vh;

  position: relative;

  margin-bottom: 1rem;

  @media (min-width: 48rem) {
    margin-bottom: 3rem;
  }

  @media (min-width: 72rem) {
    margin-bottom: 7rem;
  }

  img {
    z-index: -1;
  }

  h1 {
    font-size: 3rem;
    font-style: bold;
    text-align: center;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Header(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest}>
      {children}
    </Root>
  );
}

export default React.forwardRef(Header)

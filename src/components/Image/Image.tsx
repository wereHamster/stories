import * as React from "react";
import NextImage from 'next/image'

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  src: string;
}

function Image(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { src, ...rest } = props;

  return (
    <Root ref={ref} style={{ padding: "2em 0" }} {...rest}>
      <NextImage src={src} width={16} height={9} sizes="100vw" />
    </Root>
  );
}

export default React.forwardRef(Image)

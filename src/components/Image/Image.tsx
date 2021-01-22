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
  const { src, width, height, layout, objectFit, sizes, style, ...rest } = props as any;

  return (
    <Root ref={ref} style={{ margin: "2em 0", position: 'relative', ...style }} {...rest}>
      <NextImage src={src} width={width} height={height} layout={layout} objectFit={objectFit} sizes={sizes} />
    </Root>
  );
}

export default React.forwardRef(Image)

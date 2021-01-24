import * as React from "react";
import NextImage from 'next/image'
import styled from "styled-components";
import { useImmer } from "use-immer";
import { Lightbox } from "@/components/Lightbox";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  transition: all .2s;
  cursor: pointer;

  &:hover {
    box-shadow:
      0 1.1px 2.2px rgba(0, 0, 0, 0.02),
      0 2.7px 5.3px rgba(0, 0, 0, 0.028),
      0 5px 10px rgba(0, 0, 0, 0.035),
      0 8.9px 17.9px rgba(0, 0, 0, 0.042),
      0 16.7px 33.4px rgba(0, 0, 0, 0.05),
      0 40px 80px rgba(0, 0, 0, 0.07);  
  }

  & > div {
    display: block !important;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  src: string;

  size?: "full" | "wide" | "default" | "narrow"
}

function Image(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { size = "default", src, width, height, layout, objectFit, sizes, style, ...rest } = props as any;

  const [state, mutate] = useImmer({
    lightbox: false
  })

  return (
    <>
      {state.lightbox && <Lightbox onClose={() => {
        mutate(draft => {
          draft.lightbox = false
        })
      }}> <NextImage src={src} objectFit="contain" layout="fill" style={{width:"100%", height: "100%"}} /></Lightbox>}
    <Root ref={ref} style={{ position: 'relative', ...style }} className={{full: 'fw', wide: 'wp', default: undefined, narrow: undefined }[size]} onClick={() => {
      mutate(draft => {
        draft.lightbox = true
      })
    }} 
    {...rest}>
    
      <NextImage src={src} width={width} height={height} layout={layout} objectFit={objectFit} sizes={sizes} />
    </Root>
    </>
  );
}

export default React.forwardRef(Image)

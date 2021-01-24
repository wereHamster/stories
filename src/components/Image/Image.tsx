import * as React from "react";
import NextImage from 'next/image'
import styled from "styled-components";
import { useImmer } from "use-immer";
import { Lightbox } from "@/components/Lightbox";
import { Metadata } from "@zhif/macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  cursor: pointer;

  & > div {
    display: block !important;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  source?: any;

  src: string;

  img?: { src: string }
  metadata: Metadata

  size?: "full" | "wide" | "default" | "narrow"

  caption?: React.ReactNode
}

function Image(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { size = "default", src, width, height, layout, objectFit, sizes, style, metadata = { width, height }, img = { src }, source = { img, metadata }, ...rest } = props as any;

  const [state, mutate] = useImmer({
    lightbox: false
  })


  return (
    <>
      {state.lightbox && (
        <Lightbox onClose={() => {
          mutate(draft => {
            draft.lightbox = false
          })
        }}>
          <NextImage src={source.img.src} objectFit="contain" layout="fill" />
        </Lightbox>
      )}

      <Root ref={ref} style={{ position: 'relative', ...style, maxWidth: size === 'narrow' ? 400 : undefined }} className={{full: 'fw', wide: 'wp', default: undefined, narrow: undefined }[size]} onClick={() => {
        mutate(draft => {
          draft.lightbox = true
        })
      }} 
      {...rest}>
        <NextImage src={source.img.src} width={source.metadata.width} height={source.metadata.height} layout={layout} objectFit={objectFit} sizes={sizes} />
      </Root>
    </>
  );
}

export default React.forwardRef(Image)

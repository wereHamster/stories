import * as React from "react";
import NextImage from 'next/image'
import styled from "styled-components";
import { useImmer } from "use-immer";
import { Lightbox } from "@/components/Lightbox";
import { Metadata } from "@zhif/macro";
import { useBlurHash } from "@/hooks/useBlurHash";
import { Router, useRouter } from "next/router";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  position: relative;
  cursor: pointer;

  & > figure {
    margin: 0;
  }

  .bg {
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
    transition: opacity .5s ease-out .1s;
    background-size: cover;
    background-position: 50% 50%;
  }

  & > figure > div {
    display: block !important;
  }

  & > figcaption {
    text-align: center;
    margin: 8px 0;
    font-size: .9em;
    font-style: italic;
    opacity: 0.7;
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
  const { size = "wide", src, width, height, layout, objectFit, sizes, style, metadata = { width, height }, img = { src }, source = { src, metadata }, caption, ...rest } = props as any;

  // const router = useRouter()
  // const blurHashURL = useBlurHash(source.blurHash);

  const [state, mutate] = useImmer({
    lightbox: false
  })

  if (src) {
    source.src = src
  }

  return (
    <>
      {state.lightbox && (
        <Lightbox
          onClose={() => {
            mutate(draft => {
              draft.lightbox = false
            })
            // router.push(router.asPath.replace(/\/i\/.*/, ''))
          }}
          caption={caption}
        >
          <NextImage src={source.src} objectFit="contain" layout="fill" />
        </Lightbox>
      )}

      <Root ref={ref} style={{ position: 'relative', ...style, maxWidth: size === 'narrow' ? 400 : undefined }} className={{full: 'fw', wide: 'wp', default: undefined, narrow: undefined }[size]} onClick={() => {
        mutate(draft => {
          draft.lightbox = true
        })
        // router.replace(router.asPath + '/i/foo')
      }} 
      {...rest}>
        <figure>
          <div className="bg" style={{ opacity: 1, backgroundImage: `url(${source?.sqip?.metadata?.dataURIBase64 ?? ''})` }} />
          <NextImage
            src={source.src}
            width={layout === 'fill' ? undefined : source.metadata.width}
            height={layout === 'fill' ? undefined : source.metadata.height}
            layout={layout}
            objectFit={objectFit}
            sizes={sizes}
          />
        </figure>
        {caption && <figcaption>
          {caption}
        </figcaption>}
      </Root>
    </>
  );
}

export default React.forwardRef(Image)

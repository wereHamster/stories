import * as React from "react";
import NextImage from 'next/image'
import styled from "styled-components";
import { useImmer } from "use-immer";
import { Lightbox } from "@/components/Lightbox";
import { Metadata } from "@zhif/macro";
import { useInView } from "react-intersection-observer";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  position: relative;
  cursor: pointer;

  & > figure {
    margin: 0;
  }

  .sqip {
    position: absolute;
    inset: 0;
    pointer-events: none;

    transition: opacity .8s ease-out .5s;

    background-size: cover;
    background-position: 50% 50%;

    z-index: -1;
  }

  & > figure > div {
    display: block !important;
    z-index: -2;
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
  image?: {
    src: string;

    width: number;
    height: number;

    sqip: {
      src: string
    }
  };

  size?: "full" | "wide" | "default" | "narrow"

  caption?: React.ReactNode
}

function Image(props: Props) {
  const { image, size = "wide", caption, layout, objectFit, sizes, style, ...rest } = props as any;

  const [pictureRef, inView] = useInView({ triggerOnce: true });
  const [state, mutate] = useImmer({
    lightbox: false
  })

  const ref = React.useRef<null | HTMLDivElement>(null)

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]') as HTMLImageElement
    if (img) {
      const onLoad = () => {
        if (!img.src.match(/data:image\/gif/)) {
          setLoaded(true)
          img.removeEventListener("load", onLoad)
        }
      }

      img.addEventListener("load", onLoad);
    }
  }, [])

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
          <div
            style={{
              backgroundRepeat: "no-repeat",
              position: "absolute",
              backgroundSize: "contain",
              backgroundPosition: "50% 50%",
              inset: 0,
              zIndex: -1,
              opacity: 1,
              backgroundImage: `url(${image.sqip.src})`,
            }}
          />

          <NextImage src={image.src} objectFit="contain" layout="fill" />
        </Lightbox>
      )}

      <Root ref={ref} style={{ position: 'relative', ...style, maxWidth: size === 'narrow' ? 400 : undefined }} className={{full: 'fw', wide: 'wp', default: undefined, narrow: undefined }[size]} onClick={() => {
        mutate(draft => {
          draft.lightbox = true
        })
        // router.replace(router.asPath + '/i/foo')
      }} 
      {...rest}>
        <figure ref={pictureRef}>
          <NextImage
            src={image.src}
            width={layout === 'fill' ? undefined : image.width}
            height={layout === 'fill' ? undefined : image.height}
            layout={layout}
            objectFit={objectFit}
            sizes={sizes}
          />
          <div className="sqip" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${image.sqip.src})` }} />
        </figure>

        {caption && <figcaption>{caption}</figcaption>}
      </Root>
    </>
  );
}

export default Image

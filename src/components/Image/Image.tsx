import * as React from "react";
import NextImage from 'next/image'
import { css, cx } from '@linaria/core';

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = 'div'

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

  captionStyle?: "overlay"

  onOpen?: () => void

  objectFit?: any;
  layout?: any;
  sizes?: any;
}

function Image(props: Props) {
  const { image, size = "wide", caption, captionStyle, onOpen, layout, objectFit, sizes, style, ...rest } = props;

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

  const className = {
    full: 'fw',
    wide: 'wp',
    default: undefined,
    narrow: undefined,
  }[size]

  return (
    <Root ref={ref} style={{ ...style, maxWidth: size === 'narrow' ? 400 : undefined }} className={cx(classes.root, classes.captionStyle[captionStyle], className)} {...rest}>
      <figure onClick={onOpen}>
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
  );
}

export default Image

const classes = {
  root: css`
    position: relative;
    contain: layout;
    display: grid;

    & > figure {
      cursor: pointer;
      position: relative;
      margin: 0;
    }

    .sqip {
      position: absolute;
      inset: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;

      transition: opacity .8s ease-out 1.5s;

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
      font-size: .75em;
      line-height: 1.3;
      font-style: italic;
      opacity: 0.7;
    }
  `,
  captionStyle: {
    overlay: css`
      & > figcaption {
        position: absolute;
        margin: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(0,0,0,.7), transparent);
        color: white;
        padding: 30px 20px 12px;
        text-align: left;
        pointer-events: none;
        opacity: 0;
        transition: opacity .2s;
      }

      &:hover > figcaption {
        opacity: 1;
      }
    `
  }
}

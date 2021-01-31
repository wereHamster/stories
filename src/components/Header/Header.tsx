import * as React from "react";
import styled from "styled-components";
import Image from 'next/image';
// import { Meta } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.header`
  display: grid;
  
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  min-height: 100vh;
  position: relative;

  .sqip {
    position: absolute;
    inset: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;

    transition: opacity .8s ease-out .5s;

    background-size: cover;
    background-position: 50% 50%;
    
    z-index: -1;
  }

  & > div:first-child {
    z-index: -2;
  }

  .title {
    font-size: 3rem;
    color: #1d1f20;
    padding: 5vh 5vw;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: opacity .8s ease-out 1s;
    border-radius: 4px;

    align-self: start;
    justify-self: end;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  image: {
    src: string;

    width: number;
    height: number;

    sqip: {
      src: string
    }
  }

  title: React.ReactNode
}

function Header(props: Props) {
  const { image, title, ...rest } = props;

  const ref = React.useRef<null | HTMLDivElement>(null)

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]')
    if (img) {
      {
        img.addEventListener("load", () => {
          setLoaded(true)
        }, { once: true });
      }
    }
  }, [])

  return (
    <Root ref={ref as any} {...rest}>
      <Image src={image.src} layout="fill" objectFit="cover" />
      <div className="sqip" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${image.sqip.src})` }} />

      <h1 className="title" style={{ opacity: loaded ? 1 : 0 }}>{title}</h1>
    </Root>
  );
}

export default Header

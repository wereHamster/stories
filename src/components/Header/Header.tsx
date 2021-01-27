import * as React from "react";
import styled from "styled-components";
import Image from 'next/image';
import { useBlurHash } from "@/hooks/useBlurHash";
// import { Meta } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.header`
  display: grid;
  
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content 1fr;

  justify-items: center;

  min-height: 100vh;

  position: relative;

  .bg {
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
    transition: opacity .5s ease-out .1s;
    background-size: cover;
  }

  & > div:first-child {
    z-index: -2;
  }

  .title {
    margin: 0;
    font-size: 4rem;
    text-align: center;
    color: #fff;
    padding: 8px 30px;
    background: rgba(0,0,0,.7);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 50vh;
    border-radius: 4px;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
    margin-top: 8px;
  }

  .meta {
    grid-row: 3;
    text-align: center;
    align-self: end;
    margin: 15vh 0 24px;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blurHash?: string
  image: string

  title: React.ReactNode
  subtitle?: React.ReactNode
  date: Date
}

function Header(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { blurHash, image, title, subtitle, date, ...rest } = props;

  const [loaded, setLoaded] = React.useState(false);
  const blurHashURL = useBlurHash(blurHash);
  React.useEffect(() => {
    const i = new window.Image()
    i.addEventListener("load", () => setLoaded(true), { once: true });
    i.src = image
  }, [image])

  return (
    <Root ref={ref as any} {...rest}>
      <Image src={image} layout="fill" objectFit="cover" />
      {blurHashURL && <div className="bg" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url("${blurHashURL}")` }} />}

      <div style={{ gridRow: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="title">{title}</h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>

      {/* <Meta
        className="meta"
        avatar="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/D45DBA64-743E-43CB-9D73-9CBEF228A3A0.jpg"
        author="Tomáš Čarnecký"
        date={date}
      /> */}
    </Root>
  );
}

export default React.forwardRef(Header)

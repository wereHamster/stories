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
    background-position: 50% 50%;
  }

  & > div:first-child {
    z-index: -2;
  }

  .title {
    margin: 0 2vw 70vh 0;
    font-size: 4rem;
    text-align: center;
    color: #1d1f20;
    padding: 8px 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 4px;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  sqip: any;

  image: string

  title: React.ReactNode
}

function Header(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { sqip, image, title, ...rest } = props;

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const i = new window.Image()
    i.addEventListener("load", () => 
    setTimeout(() => {
      setLoaded(true)
    }, 500), { once: true });
    i.src = image
  }, [image])

  // console.log(sqip?.metadata?.dataURI)

  return (
    <Root ref={ref as any} {...rest}>
      <Image src={image} layout="fill" objectFit="cover" />
      {/* {blurHashURL && <div className="bg" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url("${blurHashURL}")` }} />} */}
      <div className="bg" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${sqip?.metadata?.dataURIBase64 ?? ''})` }} />

      <div style={{ gridRow: 2, justifySelf: 'end', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <h1 className="title">{title}</h1>
      </div>
    </Root>
  );
}

export default React.forwardRef(Header)

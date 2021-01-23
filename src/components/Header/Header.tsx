import * as React from "react";
import styled from "styled-components";
import Image from 'next/image';
import { Meta } from "./internal";

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

  img {
    z-index: -1;
  }

  .title {
    margin: 0;
    font-size: 3rem;
    font-style: bold;
    text-align: center;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
  }

  .subtitle {
    font-size: 1.3rem;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
    margin-top: 4px;
  }

  .meta {
    grid-row: 3;
    text-align: center;
    align-self: end;
    margin: 15vh 0 5vh;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  image: string

  title: React.ReactNode
  subtitle?: React.ReactNode
  date: Date
}

function Header(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, image, title, subtitle, date, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest}>
      <Image src={image} layout="fill" objectFit="cover" />

      <div style={{ gridRow: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="title">{title}</h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>

      <Meta
        className="meta"
        avatar="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/D45DBA64-743E-43CB-9D73-9CBEF228A3A0.jpg"
        author="Tomas Carnecky"
        date={date}
      />
    </Root>
  );
}

export default React.forwardRef(Header)

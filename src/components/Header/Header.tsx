import * as React from "react";
import styled from "styled-components";
import Image from 'next/image';

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  position: relative;

  img {
    z-index: -1;
  }

  h1 {
    font-size: 3rem;
    font-style: bold;
    text-align: center;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
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

      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div>
        <div>Author</div>
        <div>{date.toISOString()}</div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Header)

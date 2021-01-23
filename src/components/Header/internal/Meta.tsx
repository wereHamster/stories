import * as React from "react";
import styled from "styled-components";
import { FormattedDate } from 'react-intl'
import Image from 'next/image'

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  font-size: 1.2rem;

  img {
    border-radius: 100%;
  }

  .box {
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
  }

  span {
    font-weight: bold;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  avatar: string;
  author: React.ReactNode
  date: Date
}

function Meta(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { avatar, author, date, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest}>
      <div style={{ width: 60, height: 60, marginBottom: 12 }}>
        <Image src={avatar} width={60} height={60} />
      </div>
      <div className="box">
        <div>by <span>{author}</span></div>
        <div><FormattedDate value={date} /></div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Meta)

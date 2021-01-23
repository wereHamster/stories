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

  img {
    border-radius: 100%;
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
      <div style={{ width: 60, height: 60 }}><Image src={avatar} width={60} height={60} /></div>
      <div>by {author}</div>
      <div><FormattedDate value={date} /></div>
    </Root>
  );
}

export default React.forwardRef(Meta)

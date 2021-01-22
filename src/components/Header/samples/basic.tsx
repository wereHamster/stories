import * as React from "react";
import { Header } from "..";
import Image from 'next/image';

type Props = Partial<React.ComponentPropsWithoutRef<typeof Header>>;

export default function Sample(props: Props) {
  return <Header {...props} >
     <Image
        src="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/vlcsnap-2021-01-14-22h08m34s340.png"
        layout="fill"
            objectFit="cover"
      />
    <h1>Kyrgyzstan</h1>
  </Header>;
}

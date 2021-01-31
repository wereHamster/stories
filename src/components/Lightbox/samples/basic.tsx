import * as React from "react";
import { Lightbox } from "..";
import NextImage from "next/image";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Lightbox>>;

export default function Sample(props: Props) {
  return (
    <div style={{ height: '600px' }}>
      <Lightbox {...props}>
        <NextImage src="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg" objectFit="contain" layout="fill" />    
      </Lightbox>
    </div>
  );
}

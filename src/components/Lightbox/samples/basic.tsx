import * as React from "react";
import { Lightbox } from "..";
import { importImage } from "@zhif/macro"
import { Image } from "@/components/Image";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Lightbox>>;

export default function Sample(props: Props) {
  const { metadata } = importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg")

  return (
    <div style={{ height: '600px' }}>
      <Lightbox {...props}>
        <Image src="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg" layout="responsive" width={metadata.width} height={metadata.height} />
      </Lightbox>
    </div>
  );
}

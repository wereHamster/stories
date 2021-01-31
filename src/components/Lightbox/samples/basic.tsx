import * as React from "react";
import { Lightbox } from "..";
import { Image } from "@/components/Image";
import { importImage } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Lightbox>>;

export default function Sample(props: Props) {
  return (
    <div style={{ height: '600px' }}>
      <Lightbox {...props}>
        <Image
          image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg")}
          layout="fill"
          style={{width:"100%", height: "100%"}}
        />
      </Lightbox>
    </div>
  );
}

import * as React from "react";
import { Image } from "..";
import { importImage } from "../../../../image.macro"

type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default function Sample(props: Props) {
  return (
    <Image
      image={{
        ...importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg"),
        src: "https://storage.googleapis.com",
      }}
      {...props}
    />
  );
}

import * as React from "react";
import { Image } from "..";
import { importImage } from "@zhif/macro"


type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default function Sample(props: Props) {
  const { metadata } = importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg")
  return <Image src="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg" metadata={metadata} layout="responsive" {...props} />;
}

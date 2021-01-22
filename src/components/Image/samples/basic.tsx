import * as React from "react";
import { Image } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default function Sample(props: Props) {
  return <Image src="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg" {...props} />;
}

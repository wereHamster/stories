import * as React from "react";
import { Group } from "..";
import { importImage } from "../../../../image.macro"
import { Image } from "@/components/Image"

type Props = Partial<React.ComponentPropsWithoutRef<typeof Group>>;

export default function Sample(props: Props) {
  return (
    <Group {...props}>
      <Image
        span={[4]}
        aspectRatio={16 / 9}
        image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg")}
      />
      <Image
        span={[5]}
        aspectRatio={16 / 9}
        image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0071.jpg")}
      />
      <Image
        span={[3]}
        aspectRatio={2 / 3}
        image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0020.jpg")}
      />
    </Group>
  );
}

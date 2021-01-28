import * as React from "react";
import { Header } from "..";
import { importImage } from "../../../../image.macro"

type Props = Partial<React.ComponentPropsWithoutRef<typeof Header>>;

const image = importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/vlcsnap-2021-01-14-22h08m34s340.png")

export default function Sample(props: Props) {
  return (
    <Header
      image={{
        src: image.src,
        ...image.metadata,
        sqip: {
          src: image.sqip.metadata.dataURIBase64
        }
      }}
      title="Title"
      {...props}
    />
  );
}

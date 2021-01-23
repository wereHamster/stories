import * as React from "react";
import { Header } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Header>>;

export default function Sample(props: Props) {
  return <Header {...props} image="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/vlcsnap-2021-01-14-22h08m34s340.png" title="Title" date={new Date()} />;
}

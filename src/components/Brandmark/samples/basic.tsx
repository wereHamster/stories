import * as React from "react";
import { Brandmark } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Brandmark>>;

export default function Sample(props: Props) {
  return <Brandmark {...props} />;
}

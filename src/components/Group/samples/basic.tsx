import * as React from "react";
import { Group } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Group>>;

export default function Sample(props: Props) {
  return <Group {...props} />;
}

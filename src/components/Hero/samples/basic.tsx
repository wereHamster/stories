import * as React from "react";
import { Hero } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Hero>>;

export default function Sample(props: Props) {
  return <Hero story={{ id: "ID", title: "TITLE", lead: "LEAD" }} {...props} />;
}

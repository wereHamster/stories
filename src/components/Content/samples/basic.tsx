import * as React from "react";
import { Content } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Content>>;

export default function Sample(props: Props) {
  return (
    <Content {...props}>
      <div style={{ display: "grid", placeItems: "center", padding: "8px", background: "teal", margin: "2px 0" }}>
        center
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          padding: "8px",
          gridColumn: "lex / rex",
          background: "teal",
          margin: "2px 0",
        }}
      >
        extended
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          padding: "8px",
          gridColumn: "le / re",
          background: "teal",
          margin: "2px 0",
        }}
      >
        full
      </div>
    </Content>
  );
}

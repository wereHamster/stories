import * as React from "react";
import { Content } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Content>>;

export default function Sample(props: Props) {
  return <Content {...props}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas egestas fringilla phasellus faucibus scelerisque. Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris. Egestas dui id ornare arcu odio ut sem. Varius vel pharetra vel turpis nunc. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus.</p>
    <p>Mi bibendum neque egestas congue. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Feugiat vivamus at augue eget. Lacus laoreet non curabitur gravida arcu. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Quis auctor elit sed vulputate mi sit amet mauris commodo. Risus sed vulputate odio ut enim blandit. Nisl rhoncus mattis rhoncus urna.</p>

    <div style={{ height: 100, margin: "1em 0", background: "teal" }}></div>
    <div className="wp" style={{ height: 100, margin: "1em 0", background: "teal" }}></div>
    <div className="fw" style={{ height: 100, margin: "1em 0", background: "teal" }}></div>
  </Content>;
}

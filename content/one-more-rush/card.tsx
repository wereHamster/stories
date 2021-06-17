import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importImage } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      layout="inverted"
      image={importImage("https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_4340.jpeg")}
      caption="One More Rush"
      teaser="I’m fortunate enough that I can work from wherever there is good internet. That
      covers a lot of this earths surface – and airspace."
    />
  );
}

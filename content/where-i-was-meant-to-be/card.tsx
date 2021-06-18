import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importImage } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      story={{
        id: "where-i-was-meant-to-be",
      }}
      image={importImage(
        "https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/vlcsnap-2021-01-14-22h08m34s340.png"
      )}
      blocks={[
        importImage(
          "https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/IMG_2339.jpg"
        )
      ]}
      caption="Where I was meant to be"
      teaser="I was going through a really fucking difficult time in my life and needed to get the fuck away from comfort."
    />
  );
}

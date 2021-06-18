import * as React from "react";
import { StoryCard } from "..";
import { importImage } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof StoryCard>>;

export default function Sample(props: Props) {
  return (
    <StoryCard
      story={{ id: "ID" }}
      image={importImage("https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_4340.jpeg")}
      caption="Semper viverra nam libero justo laoreet"
      teaser="Suspendisse ultrices gravida dictum fusce ut. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Amet cursus sit amet dictum sit amet justo donec enim. Ut tortor pretium viverra suspendisse potenti."
      {...props}
    />
  );
}

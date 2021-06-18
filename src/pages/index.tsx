import { Hero } from "@/components/Hero";
import { css } from "@linaria/core";
import * as React from "react";
import stories from "../../content";

export default function Page() {
  return (
    <>
      <Hero
        story={{
          id: "one-more-rush",
          title: "One More Rush",
          lead: <>In early February 2021 I was still hurting, and wanted to leave Switzerland once more.</>,
        }}
      />

      <div className={classes.stories}>
        {Object.keys(stories).map((storyId) => (
          <div style={{ margin: "25vh 0" }}>{React.createElement(stories[storyId].Card)}</div>
        ))}
      </div>
    </>
  );
}

const classes = {
  title: css`
    text-align: center;
    margin: 10vh 0 3vh;
  `,

  stories: css`
    margin-top: 40vh;

    a {
      text-decoration: none;
    }
  `,
};

import { Hero } from "@/components/Hero";
import { css } from "@linaria/core";
import Link from "next/link";
import * as React from "react";
import stories from "../../content";

export default function Page() {
  return (
    <>
      <Hero />

      <div className={classes.stories}>
        {Object.keys(stories).map((storyId) => (
          <Link href={`/${storyId}`} key={storyId}>
            <a style={{ display: "block", margin: "25vh 0" }}>{React.createElement(stories[storyId].Card)}</a>
          </Link>
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
    position: relative;

    a {
      text-decoration: none;
    }
  `,
};

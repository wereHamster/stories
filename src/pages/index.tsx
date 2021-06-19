import { Hero } from "@/components/Hero";
import { css } from "@linaria/core";
import * as React from "react";
import stories from "../../content";

export default function Page() {
  return (
    <>
      <Hero />

      <div className={classes.featuredStories}>
        {featuredStories.map((storyId) => (
          <div style={{ margin: "30vh 0" }}>{React.createElement(stories[storyId].Card)}</div>
        ))}
      </div>
    </>
  );
}

const classes = {
  featuredStories: css``,
};

const featuredStories = ["one-more-rush", "where-i-was-meant-to-be"];

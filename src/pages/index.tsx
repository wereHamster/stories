import { Hero } from "@/components/Hero";
import { css } from "@linaria/core";
import Head from "next/head";
import * as React from "react";
import stories from "../../content";

export default function Page() {
  return (
    <>
      <Head>
        <title>Stories by Tomáš Čarnecky</title>
      </Head>

      <Hero />

      <div className={classes.featuredStories}>
        {featuredStories.map((storyId) => (
          <div key={storyId} style={{ margin: "30vh 0" }}>
            {React.createElement(stories[storyId].Card)}
          </div>
        ))}
      </div>
    </>
  );
}

const classes = {
  featuredStories: css``,
};

const featuredStories = ["one-more-rush", "where-i-was-meant-to-be"];

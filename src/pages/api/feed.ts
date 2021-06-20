import { Feed } from "feed";
import { NextApiRequest, NextApiResponse } from "next";
import { mediaType } from "@hapi/accept";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { host } = req.headers;
  if (!host) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Request is missing required 'Host' header");

    return;
  }

  const { accept, ["user-agent"]: userAgent } = req.headers;

  const acceptedContentType = mediaType(accept, ["application/rss+xml"]);
  console.log({ host, accept, userAgent, contentType: acceptedContentType });

  if (!acceptedContentType) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Content negotiation failed");

    return;
  }

  const scheme = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${scheme}://${host}`;

  const date = new Date();

  const author = {
    name: "Tomáš Čarnecký",
    email: "tomc@caurea.org",
    link: "https://caurea.org",
  };

  const feed = new Feed({
    title: `Stories by Tomáš Čarnecký`,
    description: "…for nothing remains of us but the vibrations we leave behind.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Tomáš Čarnecký`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/feed`,
      //   json: `${baseUrl}/rss/feed.json`,
      //   atom: `${baseUrl}/rss/atom.xml`,
    },
    author,
  });

  const stories = [
    {
      id: "one-more-rush",
      title: "One More Rush",
      publishedAt: new Date(Date.parse("2021-05-18")),
    },
    {
      id: "where-i-was-meant-to-be",
      title: "Where I was meant to be",
      publishedAt: new Date(Date.parse("2021-01-22")),
    },
  ];

  stories.forEach((story) => {
    const url = `${baseUrl}/${story.id}`;
    feed.addItem({
      title: story.title,
      id: url,
      link: url,
      // description: story.description,
      // content: markdown.toHTML(post.content),
      author: [author],
      contributor: [author],
      date: story.publishedAt,
    });
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml");
  res.end(feed.rss2());
};

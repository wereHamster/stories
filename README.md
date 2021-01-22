# Introduction

A simple photo story website built in top of [Next.js](https://nextjs.org/),
[React](https://reactjs.org/), and [MDX](https://mdxjs.com/).

# Goals, constraints, and focus

The main focus of this project is on performance. The website aims reach
the highest score on all Web Vital metrics.

The second focus is on User Experience (UX). Reading the stories, and expecially
viewing the images should be a pleasant and intuitive experience.

One important constraint is that the project avoids hard dependencies
on external services. Everything that the project requires (content and
images) must be possible to be stored within the repository.

# Stories

Stories are written in MDX (a variation of Markdown which allows use of React
components).

Each story is stored in a separate folder under `content/`.

Each story folder contains multiple files:

 - `body.mdx` – The story content.
 - `header.tsx` – The header element which is shown at the very top of the page.
 - `meta.ts` – Meta information of the story (title, description, …).
 - `image.tsx` – Renders the Open Graph image.

Note that not all Markdown constructs are supported, use only paragraphs and headings.

To add a story… TODO

# Hosting

Project should work out of the box when deployed to [Vercel](https://vercel.com).

# Inspiration

This project was inspired by https://exposure.co.

# Credits

Initial work by [Yves Ineichen](https://github.com/iff), with contributions
by [Tomas Carnecky](https://github.com/wereHamster).

# Stories

Very simple photo story framework, inspired by https://exposure.co.

- [Next.js](https://nextjs.org/) / [React](https://reactjs.org/)
- Focus on performance, usable without JavaScript enabled.
- No external runtime dependencies (CMS, image hosting).
- Content authoring through [mdx](https://mdxjs.com/).

## Content

A story consists of:

 - A header element which is shown at the very top of the page.
 - Content which is authored in MDX. Supported is: paragraphs, images, groups of images
   (displayed in a grid). The content is placed into a centered CSS grid. Elements
   can extend beyond the main column and be even as wide as the viewport.

Certain blocks (images) can be focused (shown in a lightbox).

## Routes

The following routes are handled by the application:

 - `/[story]` – the story page
 - `/[story]/[block]` - focus on a specific block, eg. if image then the image is shown in a lightbox

## Testing

```bash
nix-shell  # if necessary
npm install
npm run dev
```

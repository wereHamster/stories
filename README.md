# plog

Very simple photo story framework:

- next/react app
- components heavily based on [timvir](https://timvir.now.sh/)
- using [zhif](https://github.com/wereHamster/zhif/) for dealing with images
- the content/stories make use of [mdx](https://mdxjs.com/) with very limited layout options

In the future I plan to cleanup the css code, simplify image handling (grid, lightbox, ..).

## Testing

```bash
nix-shell  # if necessary
npm install
npm run dev
```

## Routes

 - `/[story]` – the story page
 - `/[story]/[block]` - focus on a specific block, eg. if image then the image is shown in a lightbox
 
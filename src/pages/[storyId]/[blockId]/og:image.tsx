import { css } from "@linaria/core";
import NextImage from "next/image";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

export interface Query extends ParsedUrlQuery {
  storyId: string;
  blockId: string;
}

interface Props {
  storyId: string;
  blockId: string;
  block: Block;
}

type Block = { __typename: "Image"; id: string; image: { src: string; sqip: { src: string } }; caption: null | string };

export default function Page(props: Props) {
  const { block } = props;

  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
        display: grid;
      `}
    >
      <NextImage src={block.image.src} layout="fill" objectFit="cover" />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const Body = require(`../../../../content/${params.storyId}/body.mdx`).default;
  const { children } = Body({}).props;

  const blocks: Array<{ __typename: "Image"; id: string; image: any; caption: null | string }> = [];
  React.Children.forEach(children, function go(child: any) {
    if (React.isValidElement(child)) {
      const props = child.props as any;

      if (props.mdxType === "Image") {
        blocks.push({
          __typename: "Image",
          id: props.image.hash,
          image: props.image,
          caption: props.caption,
        });
      }

      React.Children.forEach(props.children, go);
    }
  });

  const block = blocks.find((x) => x.id === params.blockId);

  return {
    props: {
      ...params,
      block: {
        ...block,
        caption: block.caption ?? null,
      },
    },
  };
}

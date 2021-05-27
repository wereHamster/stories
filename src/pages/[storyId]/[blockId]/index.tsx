import { Lightbox } from "@/components/Lightbox";
import { css } from "@linaria/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import NextImage from "next/image";
import { useRouter } from "next/router";
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
  next: null | string;
  prev: null | string;

  title?: string;
}

type Block = { __typename: "Image"; id: string; image: { src: string; sqip: { src: string } }; caption: null | string };

export default function Page(props: Props) {
  const router = useRouter();

  const { storyId, blockId, block, next, prev, title } = props;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        {block.caption && <meta property="og:description" content={block.caption} />}
        <meta
          property="og:image"
          content={`${
            process.env.NEXT_PUBLIC_URL ? `https://${process.env.NEXT_PUBLIC_URL}` : "http://localhost:3000"
          }/api/screenshot?path=/${storyId}/og:image`}
        />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Lightbox
        onClose={async () => {
          await router.replace(`/${storyId}`);
          document.getElementById(blockId)?.scrollIntoView({ block: "center", inline: "center" });
        }}
        caption={block.caption}
        prev={prev && { href: `/${storyId}/${prev}` }}
        next={next && { href: `/${storyId}/${next}` }}
      >
        <Inner key={block.image.src} image={block.image} />
      </Lightbox>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
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
  const index = blocks.indexOf(block);

  const { title } = require(`../../../../content/${params.storyId}/meta`).default;

  return {
    props: {
      ...params,
      block: {
        ...block,
        caption: block.caption ?? null,
      },
      prev: blocks[index - 1]?.id ?? null,
      next: blocks[index + 1]?.id ?? null,

      title: `${params.blockId} - ${title}`,
    },
  };
};

function Inner({ image }: { image: { src: string; sqip: { src: string } } }) {
  const ref = React.useRef<null | HTMLDivElement>(null);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]') as HTMLImageElement;
    if (img) {
      const onLoad = () => {
        if (!img.src.match(/data:image\/gif/)) {
          setLoaded(true);
          img.removeEventListener("load", onLoad);
        }
      };

      img.addEventListener("load", onLoad);
    }
  }, []);

  return (
    <div ref={ref}>
      <NextImage
        src={image.src}
        objectFit="contain"
        layout="fill"
        onError={(ev) => {
          ev.currentTarget.style.visibility = "hidden";
        }}
        onLoad={(ev) => {
          ev.currentTarget.style.visibility = "inherit";
        }}
      />
      <div
        className={css`
          position: absolute;
          z-index: 1;

          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50% 50%;

          transition: opacity 0.5s ease-out;
          opacity: 1;

          inset: 0;
          right: 0;
          bottom: 0;
          left: 0;
        `}
        style={{
          opacity: loaded ? 0 : 1,
          backgroundImage: `url(${image.sqip.src})`,
        }}
      />
    </div>
  );
}

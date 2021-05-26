import { Lightbox } from "@/components/Lightbox";
import { GetStaticPaths, GetStaticProps } from "next";
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
  block: any;
  next: null | string;
  prev: null | string;
}

export default function Page(props: Props) {
  const router = useRouter();

  const { storyId, blockId, block, next, prev } = props;

  return (
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
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const Body = require(`../../../content/${params.storyId}/body.mdx`).default;
  const { children } = Body({}).props;

  const blocks: Array<{ __typename: string; id: string; image: any; caption: any }> = [];
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

  return {
    props: {
      ...params,
      block: {
        ...block,
        caption: block.caption ?? null,
      },
      prev: blocks[index - 1]?.id ?? null,
      next: blocks[index + 1]?.id ?? null,
    },
  };
};

function Inner({ image }: any) {
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
        style={{
          backgroundRepeat: "no-repeat",
          position: "absolute",
          backgroundSize: "contain",
          backgroundPosition: "50% 50%",
          transition: "opacity .5s ease-out",
          inset: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: loaded ? 0 : 1,
          zIndex: 1,
          backgroundImage: `url(${image.sqip.src})`,
        }}
      />
    </div>
  );
}

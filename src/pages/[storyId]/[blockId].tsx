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
      prev={(() => {
        if (prev) {
          return () => router.replace(`/${storyId}/${prev}`);
        }
      })()}
      next={(() => {
        if (next) {
          return () => router.replace(`/${storyId}/${next}`);
        }
      })()}
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

  const blocks: Array<React.ReactElement<unknown, string | React.JSXElementConstructor<any>>> = [];
  React.Children.forEach(children, function go(child: any) {
    if (React.isValidElement(child)) {
      if ((child.props as any).mdxType === "Image") {
        blocks.push(child);
      }

      React.Children.forEach((child.props as any).children, go);
    }
  });

  const blocksX = blocks.map((child) => {
    const props = child.props as any;
    return {
      id: props.image.hash,
      type: "Image",
      image: props.image,
      caption: props.caption,
    };
  });

  const focusBlock = blocksX.find((x) => x.id === params.blockId);
  const index = blocksX.indexOf(focusBlock);

  return {
    props: {
      ...params,
      block: {
        ...focusBlock,
        caption: focusBlock.caption ?? null
      },
      prev: blocksX[index - 1]?.id ?? null,
      next: blocksX[index + 1]?.id ?? null,
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

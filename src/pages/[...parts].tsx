import { Content } from "@/components/Content";
import { Group } from "@/components/Group";
import { Header } from "@/components/Header";
import { Image } from "@/components/Image";
import { Lightbox } from "@/components/Lightbox";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import NextImage from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useImmer } from "use-immer";
import { css, cx } from "@linaria/core";

interface Value {
  mutate: any;
  highlight: undefined | string;
}

const Context = React.createContext<Value>({
  mutate: () => {},
  highlight: undefined,
});

type Block = { id: string; type: "Image"; image: any; caption: any };

const components = {
  wrapper: ({ children }) => {
    const blocks: any[] = [];
    React.Children.forEach(children, function go(child: any) {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === "Image") {
          blocks.push(child);
        }

        React.Children.forEach((child.props as any).children, go);
      }
    });

    const { mutate } = React.useContext(Context);
    React.useEffect(() => {
      setTimeout(() => {
        mutate((draft) => {
          draft.blocks = blocks.map((child: any) => {
            const props = child.props as any;
            return {
              id: props.image.hash,
              type: "Image",
              image: props.image,
              caption: props.caption,
            };
          });
        });
      });
    }, []);

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === "Image") {
          const index = blocks.indexOf(child);

          return React.cloneElement(child as any, {
            id: `${(child.props as any).image.hash}`,
            index,
            className: cx(
              (child.props as any).className,
              {
                full: "fw",
                wide: "wp",
              }[(child.props as any).size],
              css`
                margin: 2em auto;
              `,
              (child.props as any).size === "narrow" &&
                css`
                  max-width: 400px;
                `
            ),
          });
        }

        if ((child.props as any).mdxType === "Group") {
          return React.cloneElement(child as any, {
            className: cx(
              (child.props as any).className,
              css`
                margin: 2em 0;
              `
            ),
            children: React.Children.map((child.props as any).children, (child) => {
              if (React.isValidElement(child)) {
                const index = blocks.indexOf(child);

                return React.cloneElement(child as any, {
                  id: `${(child.props as any).image.hash}`,
                  index,
                });
              } else {
                return child;
              }
            }),
          });
        }
      }

      return child;
    });
  },
  h1: (props: any) => <h2 {...props} />,
  Header,
  Image: (props: any) => {
    const router = useRouter();
    const { highlight } = React.useContext(Context);

    return <Image {...props} highlight={props.id === highlight} href={`/${router.query.parts[0]}/${props.id}`} />;
  },
  Group: (props: any) => {
    return <Group {...props} className={cx(props.className, "wp")} />;
  },
  blockquote: (props: any) => {
    return (
      <blockquote
        className={css`
          padding-left: 1em;
          border-left: 2px solid #fe762a;

          & > p {
            margin: 0;
          }
        `}
        {...props}
      />
    );
  },
};

const stories = {
  "where-i-was-meant-to-be": {
    meta: require("../../content/where-i-was-meant-to-be/meta").default,
    Header: dynamic(() => import(`../../content/where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`../../content/where-i-was-meant-to-be/body.mdx`)),
    Image: dynamic(() => import(`../../content/where-i-was-meant-to-be/image`)),
  },
  "one-more-rush": {
    meta: require("../../content/one-more-rush/meta").default,
    Header: dynamic(() => import(`../../content/one-more-rush/header`)),
    Body: dynamic(() => import(`../../content/one-more-rush/body.mdx`)),
    Image: dynamic(() => import(`../../content/one-more-rush/image`)),
  },
} as const;

interface State {
  blocks: Block[];
  highlight: undefined | string;
}

export default function Page() {
  const router = useRouter();

  /*
   * Extract the story ID and optional focus from the query.
   *
   *  - /[storyId]
   *  - /[storyId]/[focus]
   */
  const [storyId, focus] = (router.query.parts as string[]) ?? [];

  const { meta, Header, Body, Image } = stories[storyId] ?? {};
  if (storyId && focus === "og:image" && Image) {
    return <Image />;
  }

  const content = React.useMemo(
    () =>
      meta &&
      Header &&
      Body && (
        <MDXProvider components={components}>
          <Head>
            <title>{meta.title}</title>

            <meta property="og:title" content={meta.title} />
            <meta
              property="og:image"
              content={`${
                process.env.NEXT_PUBLIC_URL ? `https://${process.env.NEXT_PUBLIC_URL}` : "http://localhost:3000"
              }/api/screenshot?path=/${storyId}/og:image`}
            />

            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          <div style={{ marginBottom: "10vh" }}>
            <Header />
          </div>

          <Content>
            <Body />
          </Content>

          <div style={{ marginBottom: "10vh" }} />
        </MDXProvider>
      ),
    [Header, Body]
  );

  /*
   * The local state maintained by this page. It includes:
   *
   * - blocks: all blocks which can be focused, in the order as they appear
   *   in the story. Unfortunately this info is not statically available,
   *   it is initialized by the MDX «wrapper» component which recursively
   *   walks the React Virtual DOM tree. That means during the initial render
   *   we don't know what the actual block is, only it's ID (which is coming
   *   from the router query).
   */
  const [state, mutate] = useImmer<State>({
    blocks: [],
    highlight: undefined,
  });

  const value = React.useMemo<Value>(() => ({ mutate, highlight: state.highlight }), [mutate, state.highlight]);
  const focusBlock = state.blocks.find((x) => x.id === focus);

  return (
    <Context.Provider value={value}>
      {content}

      {focus && (
        <Lightbox
          onClose={() => {
            router.replace(`/${storyId}`, undefined, { scroll: false, shallow: true });

            document.getElementById(focus)?.scrollIntoView({
              block: "center",
              inline: "center",
            });

            setTimeout(() => {
              mutate((draft) => {
                draft.highlight = focus;
              });
              document.addEventListener(
                "scroll",
                () => {
                  mutate((draft) => {
                    draft.highlight = undefined;
                  });
                },
                { once: true }
              );
            }, 20);
          }}
          caption={focusBlock?.caption}
          prev={() => {
            const index = Math.max(0, state.blocks.indexOf(focusBlock) - 1);
            const image = state.blocks[index];
            if (image) {
              router.replace(`/${storyId}/${image.id}`, undefined, { scroll: false, shallow: true });
            }
          }}
          next={() => {
            const index = Math.min(state.blocks.length - 1, state.blocks.indexOf(focusBlock) + 1);
            const image = state.blocks[index];
            if (image) {
              router.replace(`/${storyId}/${image.id}`, undefined, { scroll: false, shallow: true });
            }
          }}
        >
          {focusBlock && <Inner key={focusBlock.image.src} image={focusBlock.image} />}
        </Lightbox>
      )}
    </Context.Provider>
  );
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(stories).map((story) => ({
      params: { parts: [story] },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}

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

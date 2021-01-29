import { Content } from "@/components/Content";
import { Group } from "@/components/Group";
import { Header } from "@/components/Header";
import { Image } from "@/components/Image";
import { Lightbox } from "@/components/Lightbox";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useImmer } from "use-immer";

interface Value {
  mutate: any;
}

const Context = React.createContext<Value>({
  mutate: () => {},
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
            style: { margin: "2rem auto", ...(child.props as any).style },
          });
        }

        if ((child.props as any).mdxType === "Group") {
          return React.cloneElement(child as any, {
            style: {
              marginTop: "4rem",
              marginBottom: "4rem",
              ...(child.props as any).style,
            },
            children: React.Children.map(
              (child.props as any).children,
              (child) => {
                if (React.isValidElement(child)) {
                  const index = blocks.indexOf(child);

                  return React.cloneElement(child as any, {
                    id: `${(child.props as any).image.hash}`,
                    index,
                  });
                } else {
                  return child;
                }
              }
            ),
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

    return (
      <Image
        {...props}
        onOpen={() => {
          router.replace(
            {
              pathname: "[...parts]",
              query: { parts: [router.query.parts[0], (props as any).id] },
            },
            undefined,
            { scroll: false }
          );
        }}
      />
    );
  },
  Group,
};

const stories = {
  "where-i-was-meant-to-be": {
    Header: dynamic(
      () => import(`../../content/where-i-was-meant-to-be/header`)
    ),
    Body: dynamic(
      () => import(`../../content/where-i-was-meant-to-be/index.mdx`)
    ),
  },
} as const;

interface State {
  blocks: Block[];
}

export default function Page() {
  const router = useRouter();

  /*
   * Extract the story ID and optional focus from the query.
   */
  const [storyId, focus] = (router.query.parts as string[]) ?? [];

  const { Header, Body } = stories[storyId] ?? {};

  /*
   * The local state maintained by this page.
   */
  const [state, mutate] = useImmer<State>({
    blocks: [],
  });

  const value = React.useMemo<Value>(() => ({ mutate }), [mutate]);
  const focusBlock = state.blocks.find((x) => x.id === focus);

  const content = React.useMemo(
    () =>
      Header &&
      Body && (
        <MDXProvider components={components}>
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

  if (!storyId) {
    return null;
  }

  return (
    <Context.Provider value={value}>
      {content}

      {focusBlock && (
        <Lightbox
          onClose={() => {
            router.replace(
              {
                pathname: "[...parts]",
                query: { parts: [storyId] },
              },
              undefined,
              { scroll: false }
            );
          }}
          caption={focusBlock.caption}
          prev={() => {
            const index = Math.max(0, state.blocks.indexOf(focusBlock) - 1);
            const image = state.blocks[index];
            if (image) {
              router.replace(
                {
                  pathname: "[...parts]",
                  query: { parts: [storyId, image.id] },
                },
                undefined,
                { scroll: false }
              );
            }
          }}
          next={() => {
            mutate((draft) => {
              const index = Math.min(
                state.blocks.length - 1,
                state.blocks.indexOf(focusBlock) + 1
              );
              const image = state.blocks[index];
              if (image) {
                router.replace(
                  {
                    pathname: "[...parts]",
                    query: { parts: [storyId, image.id] },
                  },
                  undefined,
                  { scroll: false }
                );
              }
            });
          }}
        >
          <Inner key={focusBlock.image.src} image={focusBlock.image} />
        </Lightbox>
      )}
    </Context.Provider>
  );
}

function Inner({ image }: any) {
  const ref = React.useRef<null | HTMLDivElement>(null);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector(
      'img[decoding="async"]'
    ) as HTMLImageElement;
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
      <NextImage src={image.src} objectFit="contain" layout="fill" />
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

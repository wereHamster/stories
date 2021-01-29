import * as React from 'react';

import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";

import { Content } from "@/components/Content"
import { Header } from "@/components/Header"
import { Image } from "@/components/Image"
import { Group } from "@/components/Group"
import { Lightbox } from "@/components/Lightbox";
import { useImmer } from "use-immer";
import NextImage from 'next/image'
import { X } from 'react-feather';

const Context = React.createContext({
  onOpen: (_: any) => {}
});

const components = {
  wrapper: ({ children }) => {
    const images: any[] = [];
    React.Children.forEach(children, function go(child: any) {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === 'Image') {
          images.push(child)
        }

        React.Children.forEach((child.props as any).children, go)
      }
    })

    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === 'Image') {
          const index = images.indexOf(child)

          return React.cloneElement(child as any, {
            id: `${(child.props as any).image.hash}`,
            images: images.map(x => ({ ...x.props.image, caption: x.props.caption })),
            index, 
            style: { margin: "2rem auto", ...(child.props as any).style },
          })
        }

        if ((child.props as any).mdxType === 'Group') {
          return React.cloneElement(child as any, {
            style: { marginTop: "4rem", marginBottom: "4rem", ...(child.props as any).style },
            children: React.Children.map((child.props as any).children, child => {
              if (React.isValidElement(child)) {
                const index = images.indexOf(child)

                return React.cloneElement(child as any, {
                  id: `${(child.props as any).image.hash}`,
                  images: images.map(x => ({ ...x.props.image, caption: x.props.caption })),
                  index,
                })
              } else {
                return child
              }
            })
          })
        }
      }

      return child
    })
  },
  h1: (props: any) => <h2 {...props} />,
  Header,
  Image: (props: any) => {
    const { onOpen } = React.useContext(Context)
    return <Image {...props} onOpen={() => {
      onOpen({ images: (props as any).images, index: (props as any).index, image: (props as any).image, caption: (props as any).caption })
    }} />
  },
  Group,
};

const stories = {
  'where-i-was-meant-to-be': {
    Header: dynamic(() => import(`../../../content/where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`../../../content/where-i-was-meant-to-be/index.mdx`)),
  }
} as const;

interface Props {
  story: keyof typeof stories;
}

export default function Page({ story }: Props) {
  const { Header, Body } = stories[story]

  const [state, mutate] = useImmer({
    lightbox: undefined as any
  })

  return (
    <Context.Provider value={{ onOpen: ({ images, index, image, caption }) => {
      mutate(draft => {
        draft.lightbox = { images, index, image, caption }
      })
    }}}>
      <MDXProvider components={components}>
        <div style={{ marginBottom: '10vh' }}>
          <Header />
        </div>

        <Content>
          <Body />
        </Content>
      </MDXProvider>

      {state.lightbox && (
        <Lightbox
          onClose={() => {
            mutate(draft => {
              draft.lightbox = undefined
            })
          }}
          caption={state.lightbox.caption}
          prev={() => {
            mutate(draft => {
              const index = Math.max(0, state.lightbox.index - 1)
              const image = state.lightbox.images[index]
              draft.lightbox = {...state.lightbox, index, image, caption: image.caption }
            })
          }}
          next={() => {
            mutate(draft => {
              const index = Math.min(state.lightbox.images.length - 1, state.lightbox.index + 1)
              const image = state.lightbox.images[index]
              draft.lightbox = {...state.lightbox, index, image, caption: image.caption }
            })
          }}
        >
          <Inner key={state.lightbox.image.src} image={state.lightbox.image} />
        </Lightbox>
      )}
    </Context.Provider>
  );
};

export async function getStaticPaths() {
  return {
    paths: Object.keys(stories).map((story) => ({ params: { story } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}


function Inner({ image }: any) {
  const ref = React.useRef<null | HTMLDivElement>(null)

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]') as HTMLImageElement
    if (img) {
      const onLoad = () => {
        if (!img.src.match(/data:image\/gif/)) {
          setLoaded(true)
          img.removeEventListener("load", onLoad)
        }
      }

      img.addEventListener("load", onLoad);
    }
  }, [])

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
  )
}

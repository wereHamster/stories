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

const Context = React.createContext({
  onOpen: (_: any) => {}
});

const components = {
  wrapper: ({ children }) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === 'Image') {
          return React.cloneElement(child as any, {
            style: { margin: "2rem auto", ...(child.props as any).style },
          })
        }

        if ((child.props as any).mdxType === 'Group') {
          return React.cloneElement(child as any, {
            style: { marginTop: "4rem", marginBottom: "4rem", ...(child.props as any).style }
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
      onOpen({ image: (props as any).image, caption: (props as any).caption })
    }} />
  },
  Group,
};

const stories = {
  'where-i-was-meant-to-be': {
    Header: dynamic(() => import(`../../../content/where-i-was-meant-to-be/header`)),
    Post: dynamic(() => import(`../../../content/where-i-was-meant-to-be/index.mdx`)),
  }
}

export default function Page({ story }) {
  const { Header, Post } = stories[story]

  const [state, mutate] = useImmer({
    lightbox: undefined as any
  })
  console.log(state)

  return (
    <Context.Provider value={{ onOpen: ({ image, caption }) => {
      mutate(draft => {
        draft.lightbox = { image, caption }
      })
    }}}>
      <MDXProvider components={components}>
        <div style={{ marginBottom: '10vh' }}>
          <Header />
        </div>

        <Content>
          <Post />
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
        >
          <Inner image={state.lightbox.image} />
        </Lightbox>
      )}
    </Context.Provider>
  );
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const stories = await fs.promises.readdir("./content");

  return {
    paths: stories.map((story) => ({ params: { story } })),
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
          opacity: loaded ? 0 : 1,
          zIndex: 1,
          backgroundImage: `url(${image.sqip.src})`,
        }}
      />
    </div>
  )
}

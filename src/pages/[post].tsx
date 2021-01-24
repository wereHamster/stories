import * as React from 'react';

import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";

import { Content } from "@/components/Content"
import { Header } from "@/components/Header"
import { Image } from "@/components/Image"
import { Group } from "@/components/Group"

const components = {
  wrapper: ({ children }) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        if (child.props.mdxType === 'Image') {
          console.log('image type')
          return React.cloneElement(child as any, { style: { margin: "2rem auto", ...child.props.style } })
        }
      }

      return child
    })
  },
  h1: (props) => <h2 {...props} />,
  Header,
  Image,
  Group,
};

export default function Page({ post }) {
  const Header = dynamic(() => import(`../../content/${post}/header`));
  const Post = dynamic(() => import(`../../content/${post}/index.mdx`));

  return (
    <MDXProvider components={components}>
      <div style={{ marginBottom: '10vh' }}>
        <Header />
      </div>

      <Content>
        <Post />
      </Content>
    </MDXProvider>
  );
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const posts = await fs.promises.readdir("./content");

  return {
    paths: posts.map((post) => ({ params: { post } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}

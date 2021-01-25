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
        if ((child.props as any).mdxType === 'Image') {
          return React.cloneElement(child as any, { style: { margin: "2rem auto", ...(child.props as any).style } })
        }

        if ((child.props as any).mdxType === 'Group') {
          return React.cloneElement(child as any, { style: { marginTop: "2rem", marginBottom: "2rem", ...(child.props as any).style } })
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

const stories = {
  kyrgyzstan: {
    Header: dynamic(() => import(`../../content/kyrgyzstan/header`)),
    Post: dynamic(() => import(`../../content/kyrgyzstan/index.mdx`)),
  }
}

export default function Page({ post }) {
  const { Header, Post } = stories[post]

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

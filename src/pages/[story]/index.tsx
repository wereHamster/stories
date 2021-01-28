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
          return React.cloneElement(child as any, { style: { marginTop: "4rem", marginBottom: "4rem", ...(child.props as any).style } })
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
  'where-i-was-meant-to-be': {
    Header: dynamic(() => import(`../../../content/where-i-was-meant-to-be/header`)),
    Post: dynamic(() => import(`../../../content/where-i-was-meant-to-be/index.mdx`)),
  }
}

export default function Page({ story }) {
  const { Header, Post } = stories[story]

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
  const stories = await fs.promises.readdir("./content");

  return {
    paths: stories.map((story) => ({ params: { story } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}

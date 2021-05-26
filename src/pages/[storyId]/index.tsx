import { Content } from "@/components/Content";
import { Group } from "@/components/Group";
import { Header } from "@/components/Header";
import { Image } from "@/components/Image";
import { css, cx } from "@linaria/core";
import { MDXProvider } from "@mdx-js/react";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  storyId: string;
}

interface Value {
  mutate: any;
  highlight: undefined | string;
}

type Block = { id: string; type: "Image"; image: any; caption: any };

const components = {
  wrapper: ({ children }) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === "Image") {
          return React.cloneElement(child as any, {
            id: `${(child.props as any).image.hash}`,
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
                return React.cloneElement(child as any, {
                  id: `${(child.props as any).image.hash}`,
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

    return <Image {...props} href={`/${router.query.storyId}/${props.id}`} />;
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
    meta: require("../../../content/where-i-was-meant-to-be/meta").default,
    Header: dynamic(() => import(`../../../content/where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`../../../content/where-i-was-meant-to-be/body.mdx`)),
  },
  "one-more-rush": {
    meta: require("../../../content/one-more-rush/meta").default,
    Header: dynamic(() => import(`../../../content/one-more-rush/header`)),
    Body: dynamic(() => import(`../../../content/one-more-rush/body.mdx`)),
  },
} as const;

interface State {
  blocks: Block[];
  highlight: undefined | string;
}

export default function Page(props: Props) {
  const { storyId } = props;
  const { meta, Header, Body } = stories[storyId];

  return (
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
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  return { props: { ...params } };
};

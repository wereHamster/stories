import { Page } from "@timvir/core";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Head from "next/head";
import toc from './toc'
import { MDXProviderComponents } from "@mdx-js/react";
import { Code } from "@timvir/blocks";

const mdxComponents: MDXProviderComponents = {
  code: function code(props: any) {
    const [, language = "markdown"] = (props.className || "").match(/^language-(.*)$/) || [];
    return <Code language={language}>{props.children}</Code>;
  },
};

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <link href="https://unpkg.com/@timvir/core@0.1.11/styles.css" rel="stylesheet" />
        <link href="https://unpkg.com/@timvir/blocks@0.1.11/styles.css" rel="stylesheet" />
      </Head>

      <Page location={useRouter()} Link={Link} toc={toc} mdxComponents={mdxComponents}>
        {children}
      </Page>
    </>
  );
}

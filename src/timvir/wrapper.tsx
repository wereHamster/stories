import { Page } from "@timvir/core";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Head from "next/head";

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <link href="https://unpkg.com/@timvir/core@0.1.6/styles.css" rel="stylesheet" />
        <link href="https://unpkg.com/@timvir/blocks@0.1.6/styles.css" rel="stylesheet" />
      </Head>

      <Page location={useRouter()} Link={Link} toc={[]}>
        {children}
      </Page>
    </>
  );
}

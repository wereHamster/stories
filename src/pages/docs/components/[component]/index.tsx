import dynamic from "next/dynamic";
import React from "react";
import Wrapper from "@/timvir/wrapper";

export default function Page({ component }: any) {
  const Component = dynamic(() => import(`../../../../components/${component}/docs/index.mdx`));

  return (
    <Wrapper>
      <Component />
    </Wrapper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  return { props: { ...params } };
}

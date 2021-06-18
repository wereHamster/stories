import dynamic from "next/dynamic";
import React from "react";

export default function Page({ component, sample }: any) {
  const Component = dynamic(() => import(`../../../../../components/${component}/samples/${sample}.tsx`));

  return <Component />;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  return { props: { ...params } };
}

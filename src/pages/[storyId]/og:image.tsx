import dynamic from "next/dynamic";
import * as React from "react";

interface Props {
  storyId: string;
}

export default function Page(props: Props) {
  const { storyId } = props;
  const Image = dynamic(() => import(`../../../content/${storyId}/image`));
  return <Image />;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}

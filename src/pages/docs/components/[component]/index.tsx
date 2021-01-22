import dynamic from "next/dynamic";
import React from "react";
import Wrapper from "@/timvir/wrapper";

export default ({ component }: any) => {
  const Component = dynamic(() => import(`../../../../components/${component}/docs/index.mdx`));

  return (
    <Wrapper>
      <Component />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const components = (await fs.promises.readdir("src/components")).filter((d) =>
    fs.existsSync(`src/components/${d}/docs/index.mdx`)
  );

  return {
    paths: components.map((component) => ({
      params: { component },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  return { props: { ...params } };
}

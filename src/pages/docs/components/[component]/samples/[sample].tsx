import dynamic from "next/dynamic";
import React from "react";

export default ({ component, sample }: any) => {
  const Component = dynamic(() => import(`../../../../../components/${component}/samples/${sample}.tsx`));

  return <Component />;
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const path = await import("path");

  const paths = [];

  const components = await fs.promises.readdir("src/components");
  for (const component of components) {
    try {
      const samples = await fs.promises.readdir(`src/components/${component}/samples`);
      for (const sample of samples) {
        paths.push({
          params: {
            component,
            sample: path.basename(sample, path.extname(sample)),
          },
        });
      }
    } catch {}
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  return { props: { ...params } };
}

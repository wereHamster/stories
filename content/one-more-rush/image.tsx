import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        src="https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_4340.jpeg"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

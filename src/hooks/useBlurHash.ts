import { decode } from "blurhash";
import React from "react";

// modified from https://gist.github.com/WorldMaker/a3cbe0059acd827edee568198376b95a
// https://github.com/woltapp/react-blurhash/issues/3
export function useBlurHash(
  blurhash: string | undefined | null,
  width: number = 32,
  height: number = 32,
  punch: number = 1
) {
  const [url, setUrl] = React.useState<null | string>(null);

  React.useEffect(() => {
    if (!blurhash) return;

    let isCancelled = false;

    // decode hash
    const pixels = decode(blurhash, width, height, punch);

    // temporary canvas to create a blob from decoded ImageData
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    const imageData = context!.createImageData(width, height);
    imageData.data.set(pixels);
    context!.putImageData(imageData, 0, 0);
    canvas.toBlob((blob) => {
      if (!isCancelled) {
        setUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }
          return URL.createObjectURL(blob);
        });
      }
    });

    return () => {
      isCancelled = true;
      setUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        return null;
      });
    };
  }, [blurhash, height, width, punch]);

  return url;
}

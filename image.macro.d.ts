import * as React from "react";

interface Metadata {
  width: number;
  height: number;
}

export interface Image {
  sqip: any;
  metadata: Metadata;
  src: string;
}

export const importImage: (src: string) => Image;

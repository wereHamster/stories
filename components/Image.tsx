import React from 'react'
import styled from 'styled-components'
import { BlurHash } from '@zhif/components'

export interface ImageProps {
  blurHash: string,
  metadata: { width: number; height: number },
  img: { src: string },
  sources: Array<{ srcSet: string; type: string }>,
  span?: string;
}

export default ({ blurHash, metadata, img, sources, span }: ImageProps) => {
  let sizes = "(max-width: 768px) 100vw, 768px";
  if (span == "wp") {
    sizes = "(max-width: 1200px) 100vw, 1200px";
  } else if (span == "fw") {
    sizes = "100vw";
  }

  return (
    <div className={span}>
      <Space>
        <BlurHash>
          <picture data-blur-hash={blurHash}>
            {sources.map((source, i) => (
              <source key={i} sizes={sizes} {...source} />
            ))}
            <img {...img} loading="lazy" {...metadata} />
          </picture>
        </BlurHash>
      </Space>
    </div>
  );
}

const Space= styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

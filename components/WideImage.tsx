import React from 'react'
import styled from 'styled-components'
import { BlurHash } from '@zhif/components'

export interface WideImageProps {
  blurHash: string,
  metadata: { width: number; height: number },
  img: { src: string },
  sources: Array<{ srcSet: string; type: string }>,
}

export default ({ blurHash, metadata, img, sources }: WideImageProps) => {
  const sizes = "(max-width: 1200px) 100vw, 1200px";
  return (
    <div className="wp">
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

import * as React from 'react';
import NextImage from 'next/image'
import { Lightbox } from '@/components/Lightbox';
import { useRouter } from 'next/router';

export default function Page({ story }) {
  const router = useRouter();

  return (
    <Lightbox onClose={() => {
        router.push(router.asPath.replace(/\/i\/.*/, ''))
    }}>
      <NextImage
        src="https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/DJI_0020.jpg"
        objectFit="contain"
        layout="fill"
      />
    </Lightbox>
  );
};

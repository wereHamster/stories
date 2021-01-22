import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import styled from "styled-components";

export interface PostProps {
  post: string;
}

export default ({ post }: PostProps) => {
  const Post = dynamic(() => import(`../content/${post}/index.mdx`).then((p) => p.card));
  return (
    <Link href={`/${post}`}>
      <a>
        <Card>
          <Post />
        </Card>
      </a>
    </Link>
  );
};

const Card = styled.div`
  margin: 1rem;
  position: relative;

  flex: 0 0 250px;
  width: 250px;

  background: black;
  overflow: hidden;

  @media (min-width: 48rem) {
    flex: 0 0 450px;
    width: 450px;
  }

  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2),
      0 8px 24px rgba(16, 22, 26, 0.2);
  }
  &:active {
    opacity: 0.9;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0),
      0 1px 1px rgba(16, 22, 26, 0.2);
  }

  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }

  img {
    display: block;
    opacity: 0.85;
  }

  h1 {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%, 0%);
    color: #fff;
    font-style: bold;
    font-size: 1.5rem;
    z-index: 2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

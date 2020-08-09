import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "react-feather";
import styled from "styled-components";

export default ({ post }) => {
  const Post = dynamic(() => import(`../content/${post}`));

  return (
    <>
      <Header>
        <Link href="/">
          <a>
            <ArrowLeft color="white" size={20} />
          </a>
        </Link>
      </Header>
      <Post />
    </>
  );
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const posts = await fs.promises.readdir("./content");

  return {
    paths: posts.map((post) => ({ params: { post } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 4;

  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;

  a {
    display: flex;
  }
`;

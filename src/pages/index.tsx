import styled from "styled-components";
import { GetStaticProps } from "next";

import Card from "../../components/Card";
import Footer from "../../components/Footer";

export default ({ posts }) => (
  <>
    <Intro>
      <p>
        I tend to look at the world through lenses. Sometimes the lense is a
        physical device attached to a camera revealing the following glimpses..
      </p>
    </Intro>

    <div className="wp">
      <Posts>
        <div className="grid">
          {posts.map((post) => (
            <Card key={post} post={post} />
          ))}
        </div>
      </Posts>
    </div>

    <Footer>2021 Tomáš Čarnecký</Footer>
  </>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const fs = await import("fs");
  const posts = await (await fs.promises.readdir("./content")).sort((a, b) =>
    b.localeCompare(a)
  );
  return { props: { posts: posts } };
};

const Intro = styled.div`
  @media (min-width: 48rem) {
    margin-top: 1rem;
  }

  @media (min-width: 72rem) {
    margin-top: 4rem;
  }
`;

const Posts = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 1rem;
  line-height: 1.5;

  @media (min-width: 48rem) {
    margin-top: 3rem;
  }

  @media (min-width: 72rem) {
    margin-top: 7rem;
  }

  .grid {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

import styled from "styled-components";

interface HeaderProps {
  children?: React.ReactNode;
}

export default ({ children }: HeaderProps) => {
  return <Header className="fw">{children}</Header>;
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 70vh;
  
  position: relative;

  margin-bottom: 1rem;

  @media (min-width: 48rem) {
    margin-bottom: 3rem;
  }

  @media (min-width: 72rem) {
    margin-bottom: 7rem;
  }

  img {
    z-index: -1;
  }

  h1 {
    font-size: 3rem;
    font-style: bold;
    text-align: center;
    color: #fff;
    padding: 4px 12px;
    background: rgba(0,0,0,.6);
  }
`;

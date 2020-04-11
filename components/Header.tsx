import styled from 'styled-components'

interface HeaderProps {
  children?: React.ReactNode
}

export default ({ children }: HeaderProps) => {
    return (
      <Header className="fw">
        {children}
      </Header>
    );
}

const Header = styled.div`
    display: block;

    margin-bottom: 1rem;

    @media (min-width: 48rem) {
      margin-bottom: 3rem;
    }

    @media (min-width: 72rem) {
      margin-bottom: 7rem;
    }

    h1 {
      position: absolute;
      width: 100%;
      bottom: 10%;
      font-size: 3rem;
      font-style: bold;
      text-align: center;
      color: #fff;
      z-index: 3;
    }
`

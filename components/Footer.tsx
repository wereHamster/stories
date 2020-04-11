import styled from 'styled-components'

interface FooterProps {
  children?: React.ReactNode
}

export default ({ children }: FooterProps) => {
    return (
      <Footer>
          {children}
      </Footer>
    );
}

const Footer = styled.div`
    height: 40px;
    padding: 0rem;

    margin-top: 3rem;
    border-top: 1px solid #eaeaea;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 0.8rem;
`

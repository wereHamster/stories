import React from 'react'
import styled from 'styled-components'

export default ({ Component, pageProps }) => (
    <Container>
      <Grid>
        <Component {...pageProps} />
      </Grid>
    </Container>
);

const Container = styled.div`
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns: [l] 0 [m] 1fr [r];

    min-height: 100vh;
`

const Grid = styled.div`
    display: grid;
    grid-column: m / r;

    grid-auto-rows: min-content;
    grid-template-columns: [le] 16px [lex lc] 1fr [rc rex] 16px [re];

    padding-bottom: 0.5rem;

    @media (min-width: 48rem) {
      grid-template-columns: [le] 24px [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] 24px [re];
      padding-bottom: 2.5rem;
    }

    @media (min-width: 72rem) {
      grid-template-columns: [le] 1fr 24px [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] 24px 1fr [re];
      padding-bottom: 0.5rem;
    }

    img {
      max-width: 100%;
      width: 100%;
      object-fit: cover;
    }

    .wp {
      grid-column: lex / rex;

      img {
        height: auto;
      }
    }

    .fw {
      grid-column: le / re;

      img {
        height: 100vh;
      }
    }

    & > *:not(.wp):not(.fw) {
      grid-column: lc / rc;
      line-height: 1.5;

      p {
        padding: 1rem 0;
        @media (min-width: 48rem) {
            padding: 2rem 0;
          }

          @media (min-width: 72rem) {
            padding: 3rem 0;
          }
        }
      }

      img {
        height: auto;
      }
    }
`

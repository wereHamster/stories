import { css } from "@linaria/core";
import Head from "next/head";
import { IntlProvider } from "react-intl";

import "@timvir/core/styles.css";
import "@timvir/blocks/styles.css";

const baseUrl = process.env.NODE_ENV === "production" ? `https://stories.caurea.org` : "http://localhost:3000";

function App({ Component, pageProps }) {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.png" />

        {/* Feed */}
        <link rel="alternate" type="application/rss+xml" title="Stories by Tomáš Čarnecky" href={`${baseUrl}/feed`} />
      </Head>

      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App;

/*
 * Global CSS
 */
css`
  :global() {
    :root {
      -webkit-text-size-adjust: 100%;
    }

    html,
    body {
      padding: 0;
      margin: 0;
      box-sizing: border-box;

      overscroll-behavior: none;

      font-family: "Tuna", system-ui, sans-serif;

      /*
       * Font size goes from 17px to 21px, changes
       * at fixed breakpoints.
       */
      font-size: 17px;
      line-height: 1.8;

      @media (min-width: 720px) {
        font-size: 19px;
        line-height: 1.7;
      }

      @media (min-width: 1280px) {
        font-size: 21px;
        line-height: 1.6;
      }
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }
`;

/*
 * Font
 */
css`
  :global() {
    /* Tuna Light */
    @font-face {
      font-family: Tuna;
      font-style: normal;
      font-weight: 300;
      src: url("/fonts/Tuna/371F3E_3_0.woff2") format("woff2");
      font-display: swap;
    }

    /* Tuna LightItalic */
    @font-face {
      font-family: Tuna;
      font-style: italic;
      font-weight: 300;
      src: url("/fonts/Tuna/371F3E_5_0.woff2") format("woff2");
      font-display: swap;
    }

    /* Tuna Regular */
    @font-face {
      font-family: Tuna;
      font-style: normal;
      font-weight: 400;
      src: url("/fonts/Tuna/371F3E_7_0.woff2") format("woff2");
      font-display: swap;
    }

    /* Tuna RegularItalic */
    @font-face {
      font-family: Tuna;
      font-style: italic;
      font-weight: 400;
      src: url("/fonts/Tuna/371F3E_9_0.woff2") format("woff2");
      font-display: swap;
    }

    /* Tuna Bold */
    @font-face {
      font-family: Tuna;
      font-style: normal;
      font-weight: 700;
      src: url("/fonts/Tuna/371F3E_0_0.woff2") format("woff2");
      font-display: swap;
    }

    /* Tuna BoldItalic */
    @font-face {
      font-family: Tuna;
      font-style: italic;
      font-weight: 700;
      src: url("/fonts/Tuna/371F3E_1_0.woff2") format("woff2");
      font-display: swap;
    }
  }
`;

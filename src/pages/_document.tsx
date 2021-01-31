import { css } from "@linaria/core";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps: any = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/fonts.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

css`
:global() {
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overscroll-behavior: none;
    font-family: 'Tuna', system-ui, sans-serif;
    font-display: swap;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
}
`;

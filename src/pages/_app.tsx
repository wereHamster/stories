import { IntlProvider } from 'react-intl'
import { css } from "@linaria/core";

function App({ Component, pageProps }) {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App

css`
:global() {
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overscroll-behavior: none;
    font-family: 'Tuna', system-ui, sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
}
`;
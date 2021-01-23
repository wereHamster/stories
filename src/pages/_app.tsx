import { IntlProvider } from 'react-intl'

function App({ Component, pageProps }) {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App

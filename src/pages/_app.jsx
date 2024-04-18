// src/pages/_app.js
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import '../styles/globals.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <div className='mx-auto container '>
        <Header />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;

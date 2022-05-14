import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { ZamozaProvider } from '../context/ZamozaContext'
import { ModalProvider } from 'react-simple-hook-modal'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId='4MGZ52fxIXN8bjr2QjeF6qXm6bbsE3nF8qlhUUeK'
      serverUrl='https://lkip5xjqrtuk.usemoralis.com:2053/server'
    >
      <ZamozaProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ZamozaProvider>
    </MoralisProvider>
  )
}

export default MyApp